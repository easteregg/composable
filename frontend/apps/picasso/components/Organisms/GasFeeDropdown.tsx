import { BaseAsset, Select } from "@/components";

import { SUBSTRATE_NETWORKS } from "@/defi/polkadot/Networks";
import {
  getPaymentAsset,
  setPaymentAsset,
} from "@/defi/polkadot/pallets/AssetTxPayment";
import { subscribeFeeItemEd } from "@/stores/defi/polkadot/transfers/subscribers";
import { useStore } from "@/stores/root";
import { ErrorOutline, LocalGasStation } from "@mui/icons-material";
import {
  alpha,
  Box,
  InputAdornment,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Signer } from "@polkadot/api/types";
import BigNumber from "bignumber.js";
import { SnackbarKey, useSnackbar } from "notistack";
import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { callbackGate, subscanExtrinsicLink } from "shared";
import { useExecutor } from "substrate-react";
import { TokenId } from "tokens";
import { useWallet } from "@/defi/queries/defi/useWallet";
import { useApi } from "@/defi/queries/defi/usePicassoApi";

type Props = {
  toggleModal: () => void;
  setTargetFeeItem: (feeItem: TokenId) => void;
};
export const GasFeeDropdown: FC<Props> = ({
  toggleModal,
  setTargetFeeItem,
}) => {
  const theme = useTheme();
  const { data: api, isLoading } = useApi();
  const feeItem = useStore((state) => state.transfers.feeItem);
  const originalFeeItem = useRef(feeItem);
  const setFeeItem = useStore((state) => state.transfers.setFeeItem);
  const feeItemEd = useStore((state) => state.transfers.feeItemEd);
  const { signer, currentAccount } = useWallet();
  const tokens = useStore(({ substrateTokens }) => substrateTokens.tokens);
  const setFeeToken = useStore((state) => state.transfers.setFeeToken);
  const balances = useStore(
    ({ substrateBalances }) => substrateBalances.balances
  );

  const options = useMemo(() => {
    return Object.values(tokens)
      .filter((token) => !!token.chainId.picasso)
      .filter(
        (token) =>
          token.id === SUBSTRATE_NETWORKS.picasso.tokenId ||
          !balances["picasso"][token.id].free.isZero()
      )
      .map((token) => ({
        value: token.id,
        label: token.symbol,
        icon: token.icon,
        disabled: balances["picasso"][token.id].free.isZero(),
        selected: feeItem === token.id,
        tokenId: token.id,
      }));
  }, [feeItem, balances, tokens]);
  const handleChangeItem = (item: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAssetId = item.target.value as TokenId;
    if (selectedAssetId === feeItem) return;

    toggleModal();
    setTargetFeeItem(selectedAssetId);
    applyTokenChange(selectedAssetId);
  };

  const executor = useExecutor();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const applyTokenChange = useCallback(
    (tokenId: TokenId) => {
      const onChainId = tokens[tokenId].chainId.picasso;
      return callbackGate(
        async (_api, walletAddress, exec, onChainAssetId) => {
          let snackbarId: SnackbarKey | undefined;
          try {
            let successMessage = `You changed your gas token from ${feeItem.toUpperCase()} to ${tokenId.toUpperCase()}`;
            await setPaymentAsset({
              api: _api,
              signer: signer as Signer,
              walletAddress,
              assetId: onChainAssetId.toString(),
              executor: exec,
              onSuccess: (txHash) => {
                closeSnackbar(snackbarId);
                enqueueSnackbar(`Gas token changed successfully`, {
                  description: successMessage,
                  variant: "success",
                  isClosable: true,
                  persist: true,
                  url: subscanExtrinsicLink("picasso", txHash),
                });
                originalFeeItem.current = tokenId;
                setFeeItem(tokenId);
                setFeeToken(tokenId);
                toggleModal();
              },
              onError: (_err) => {
                closeSnackbar(snackbarId);
                enqueueSnackbar(`An error occurred while saving settings.`, {
                  variant: "error",
                  isClosable: true,
                  persist: true,
                });
                toggleModal();
              },
              onReady: (txHash) => {
                console.log("Executing", txHash);
              },
            });
          } catch {
            // revert fee item
            closeSnackbar(snackbarId);
            enqueueSnackbar(`Operation canceled.`, {
              variant: "warning",
              isClosable: true,
              persist: true,
            });
            toggleModal();
          }
        },
        api?.picasso,
        currentAccount?.address,
        executor,
        onChainId,
        signer
      );
    },
    [
      setFeeToken,
      currentAccount?.address,
      closeSnackbar,
      enqueueSnackbar,
      executor,
      feeItem,
      api?.picasso,
      setFeeItem,
      toggleModal,
      tokens,
      signer,
    ]
  );

  useEffect(() => {
    let unsub: Array<() => void>;
    unsub = [];
    if (api?.picasso) {
      subscribeFeeItemEd(api.picasso).then((unsubscribe) => {
        unsub.push(unsubscribe);
      });
    }

    return () => {
      unsub.forEach((call) => call());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api?.picasso]);
  useEffect(() => {
    callbackGate(
      async (api, walletAddress) => {
        const result = await getPaymentAsset({
          api,
          walletAddress,
          network: "picasso",
          tokens,
        });
        if (result) {
          setFeeItem(result.id);
        }
      },
      api?.picasso,
      currentAccount?.address
    );
  }, [api?.picasso, currentAccount?.address, setFeeItem, tokens]);

  if (isLoading || !api) {
    return null;
  }

  return (
    <Select
      options={options}
      value={feeItem}
      variant="outlined"
      size="small"
      onChange={handleChangeItem}
      renderValue={(value) => {
        const option = options.find((option) => option.value == value);
        const optionBalance = option
          ? balances.picasso[option.tokenId].free
          : new BigNumber(0);
        if (!option || optionBalance.lte(feeItemEd) || optionBalance.eq(0)) {
          let reason: string;
          reason = optionBalance.lte(feeItemEd)
            ? "Your current token balance is less than existential deposit for this token"
            : "Your balance is zero, try adding more funds to your wallet.";
          return (
            <Box
              sx={{
                minWidth: theme.spacing(8),
              }}
              color={theme.palette.error.main}
            >
              <Tooltip
                title={
                  <>
                    <Typography>Wrong gas token for this transfer.</Typography>
                    <Typography variant="caption">{reason}</Typography>
                  </>
                }
                placement="bottom"
              >
                <ErrorOutline />
              </Tooltip>
            </Box>
          );
        }

        return (
          option && (
            <BaseAsset
              label={option.label || option.value}
              icon={option?.icon}
            />
          )
        );
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            sx={{
              marginRight: 0,
            }}
          >
            <LocalGasStation
              sx={{
                width: "3rem",
                color: alpha(theme.palette.common.white, 0.6),
              }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};
