import { useCallback, useState } from "react";
import { ConnectedAccounts } from "substrate-react";
import {
  InjectedAccount,
  InjectedAccountWithMeta,
} from "@polkadot/extension-inject/types";
import config from "@/constants/config";
import { decodeAddress, encodeAddress } from "@polkadot/util-crypto";
import { useApi } from "@/defi/queries/defi/usePicassoApi";
import { SubstrateNetworkId } from "shared";
import { ApiPromise } from "@polkadot/api";

export enum SupportedWalletId {
  Talisman = "talisman",
  Polkadotjs = "polkadot-js",
}

function injectMeta(
  source: string,
  list: InjectedAccount[],
  ss58Format?: number
): InjectedAccountWithMeta[] {
  return list.map(
    ({ address, genesisHash, name, type }): InjectedAccountWithMeta => ({
      address:
        address.length === 42
          ? address
          : encodeAddress(decodeAddress(address), ss58Format),
      meta: { genesisHash, name, source },
      type,
    })
  );
}

const DEFAULT_ACCOUNTS: ConnectedAccounts = {
  picasso: [],
  karura: [],
  kusama: [],
  polkadot: [],
  statemine: [],
};

export const getInjected = async (
  walletId: SupportedWalletId = SupportedWalletId.Polkadotjs
) => {
  if (!window?.injectedWeb3?.[walletId])
    throw new Error("Extension not installed.");

  return await window.injectedWeb3[walletId].enable(config.appName);
};

export const activate = async (
  walletId: SupportedWalletId,
  providers: Record<SubstrateNetworkId, ApiPromise>
) => {
  try {
    const injected = await getInjected(walletId);
    localStorage.setItem("wallet-id", walletId);
    const mapped: Map<SubstrateNetworkId, InjectedAccountWithMeta[]> =
      new Map();
    for (const [chainId, api] of Object.entries(providers)) {
      const ss58Format =
        providers[
          chainId as SubstrateNetworkId
        ].consts.system.ss58Prefix.toNumber();
      const accounts = await injected.accounts.get();
      const withMeta = injectMeta(walletId, accounts, ss58Format);
      mapped.set(chainId as SubstrateNetworkId, withMeta);
    }
    return mapped;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const useWallet = () => {
  const { data: providers } = useApi();
  const [accounts, setAccounts] = useState<
    Map<SubstrateNetworkId, InjectedAccountWithMeta[]>
  >(new Map());
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(-1);
  const activateWallet = useCallback(
    (walletId: SupportedWalletId, defaultAccount = false) => {
      if (!providers) return null;
      activate(walletId, providers).then((accounts) => {
        setAccounts(accounts);
        if (defaultAccount) {
          setSelectedAccountIndex(accounts.get("picasso")?.length ? 0 : -1);
        }
      });
    },
    [providers]
  );

  const deactivate = async (): Promise<void> => {
    setSelectedAccountIndex(-1);
    localStorage.removeItem("wallet-id");
  };
  return {
    activate: activateWallet,
    accounts,
    selectedAccount: selectedAccountIndex,
    deactivate,
    setSelectedIndex: setSelectedAccountIndex,
  };
};
