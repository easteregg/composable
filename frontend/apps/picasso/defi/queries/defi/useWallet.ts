import { useCallback, useMemo } from "react";
import {
  InjectedAccount,
  InjectedAccountWithMeta,
} from "@polkadot/extension-inject/types";
import config from "@/constants/config";
import { decodeAddress, encodeAddress } from "@polkadot/util-crypto";
import { SubstrateNetworkId } from "shared";
import { ApiPromise } from "@polkadot/api";
import { SupportedWalletId, useWalletStore } from "@/stores/defi/wallet";

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
      const ss58Format = api.consts.system.ss58Prefix.toNumber();
      const accounts = await injected.accounts.get();
      const withMeta = injectMeta(walletId, accounts, ss58Format);
      mapped.set(chainId as SubstrateNetworkId, withMeta);
    }
    return [mapped, injected] as const;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const useWallet = () => {
  const { data: providers } = useApi();
  const {
    accounts,
    selectedAccountIndex,
    walletId,
    injected,
    setWalletId,
    setSelectedAccountIndex,
    setAccounts,
    setInjected,
  } = useWalletStore();

  const isConnected = useMemo(() => {
    return Boolean(
      selectedAccountIndex !== -1 &&
        accounts.get("picasso")?.[selectedAccountIndex]
    );
  }, [accounts, selectedAccountIndex]);

  const activateWallet = useCallback(
    async (walletId: SupportedWalletId, defaultAccount = false) => {
      if (!providers) return;
      const [accounts, injected] = await activate(walletId, providers);
      setAccounts(accounts);
      setWalletId(walletId);
      setInjected(injected);
      if (defaultAccount) {
        setSelectedAccountIndex(accounts.get("picasso")?.length ? 0 : -1);
      }
    },
    [providers, setAccounts, setInjected, setSelectedAccountIndex, setWalletId]
  );

  const signer = useMemo(() => {
    return injected?.signer;
  }, [injected?.signer]);

  const currentAccount = useMemo(() => {
    return accounts.get("picasso")?.[selectedAccountIndex];
  }, [accounts, selectedAccountIndex]);

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
    walletId,
    isConnected,
    signer,
    currentAccount,
  };
};
