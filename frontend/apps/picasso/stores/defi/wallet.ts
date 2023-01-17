/*
const [accounts, setAccounts] =
    useState<Map<SubstrateNetworkId, InjectedAccountWithMeta[]>>(
      DEFAULT_ACCOUNTS
    );
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(-1);
  const [walletId, setWalletId] = useState<SupportedWalletId>(
    SupportedWalletId.Polkadotjs
  );
 */

import { SubstrateNetworkId } from "shared";
import { Injected, InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const DEFAULT_ACCOUNTS = new Map(
  Object.entries({
    picasso: [],
    karura: [],
    kusama: [],
    polkadot: [],
    statemine: [],
  })
) as Map<SubstrateNetworkId, InjectedAccountWithMeta[]>;

export enum SupportedWalletId {
  Talisman = "talisman",
  Polkadotjs = "polkadot-js",
}

type WalletState = {
  accounts: Map<SubstrateNetworkId, InjectedAccountWithMeta[]>;
  walletId: SupportedWalletId;
  selectedAccountIndex: number;
  injected: Injected | null;
};

type WalletActions = {
  setAccounts: (
    accounts: Map<SubstrateNetworkId, InjectedAccountWithMeta[]>
  ) => void;
  setWalletId: (walletId: SupportedWalletId) => void;
  setSelectedAccountIndex: (i: number) => void;
  setInjected: (i: Injected) => void;
};

const initialState: WalletState = {
  accounts: DEFAULT_ACCOUNTS,
  walletId: SupportedWalletId.Polkadotjs,
  selectedAccountIndex: -1,
  injected: null,
};

export const useWalletStore = create<WalletState & WalletActions>()(
  devtools(
    immer((set) => ({
      ...initialState,
      setAccounts: (
        accounts: Map<SubstrateNetworkId, InjectedAccountWithMeta[]>
      ) => {
        set((state) => {
          state.accounts = accounts;
        });
      },
      setWalletId: (walletId: SupportedWalletId) => {
        set((state) => {
          state.walletId = walletId;
        });
      },
      setSelectedAccountIndex: (index: number) => {
        set((state) => {
          state.selectedAccountIndex = index;
        });
      },
      setInjected: (i) => {
        set((state) => {
          state.injected = i;
        });
      },
    }))
  )
);
