import { useState } from "react";
import { ConnectedAccounts } from "substrate-react";
import {
  InjectedAccount,
  InjectedAccountWithMeta,
  InjectedExtension,
} from "@polkadot/extension-inject/types";
import { useQuery } from "@tanstack/react-query";
import config from "@/constants/config";
import { usePicassoApi } from "@/defi/queries/defi/usePicassoApi";
import { decodeAddress, encodeAddress } from "@polkadot/util-crypto";

export enum SupportedWalletId {
  Talisman = "talisman",
  Polkadotjs = "polkadot-js",
}

function mapAccounts(
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

export const useAccounts = () => {
  const [connectedAccounts, setConnectedAccounts] =
    useState<ConnectedAccounts>(DEFAULT_ACCOUNTS);
  const [extensionInjected, setInjectedExtension] = useState<
    InjectedExtension | undefined
  >(undefined);
  const [walletId, setWalletId] = useState<SupportedWalletId>(
    SupportedWalletId.Polkadotjs
  );
  const { data: api } = usePicassoApi();
  return useQuery({
    queryKey: ["accounts", api],
    queryFn: async () => {
      if (!window.injectedWeb3) {
        throw new Error("Extension not installed");
      }
      if (!window.injectedWeb3[walletId])
        throw new Error("Extension is not installed");
      const injected = await window.injectedWeb3[walletId].enable(
        config.appName
      );
      if (!!localStorage) {
        localStorage.setItem("wallet-id", walletId);
      }
      const prefix = api!.consts.system.ss58Prefix.toNumber();
      const accounts = await injected.accounts.get();

      return mapAccounts(walletId, accounts, prefix);
    },
  });
};
