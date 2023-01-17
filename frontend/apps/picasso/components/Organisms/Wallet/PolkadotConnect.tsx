import { useTheme } from "@mui/material";
import {
  SupportedWalletId,
  useEagerConnect,
  useTransactions,
} from "substrate-react";
import { DEFAULT_EVM_ID, DEFAULT_NETWORK_ID } from "@/defi/polkadot/constants";
import { NetworkId, Wallet } from "wallet";
import { ConnectorType, useBlockchainProvider, useConnector } from "bi-lib";
import { useStore } from "@/stores/root";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { useWallet } from "@/defi/queries/defi/useAccounts";

const BLOCKCHAIN_NETWORKS_SUPPORTED = [
  {
    name: "DotSama",
    icon: "/networks/picasso.svg",
    networkId: NetworkId.Polkadot,
    explorerUrl: "https://picasso.subscan.io/",
    nativeCurrencyIcon: "/logos/picasso.svg",
  },
  {
    name: "Ethereum",
    icon: "/networks/mainnet.svg",
    networkId: NetworkId.Ethereum,
    explorerUrl: "https://etherscan.io/",
    nativeCurrencyIcon: "/logos/ethereum.svg",
  },
];

const POLKADOT_WALLETS_SUPPORTED: Array<{
  walletId: SupportedWalletId;
  icon: string;
  name: string;
}> = [
  {
    walletId: SupportedWalletId.Polkadotjs,
    icon: "/logos/polkadotjs.svg",
    name: "Polkadot.js",
  },
  {
    walletId: SupportedWalletId.Talisman,
    icon: "/logos/talisman.svg",
    name: "Talisman",
  },
];

const ETHEREUM_WALLETS_SUPPORTED = [
  {
    name: "Metamask",
    icon: "/logos/metamask.svg",
    walletId: ConnectorType.MetaMask,
  },
];

export const PolkadotConnect: React.FC<{}> = () => {
  const theme = useTheme();
  const { activate, deactivate, accounts, selectedAccount, setSelectedIndex } =
    useWallet();
  const { account, connectorType } = useBlockchainProvider(DEFAULT_EVM_ID);
  const biLibConnector = useConnector(ConnectorType.MetaMask);
  useEagerConnect(DEFAULT_NETWORK_ID);

  const balance = useStore(
    ({ substrateBalances }) => substrateBalances.balances.picasso.pica
  );

  const transactions = useTransactions("-");

  return (
    <Wallet
      connectedWalletTransactions={transactions.map((tx) => {
        return {
          title: `${tx.section} ${tx.method}`,
          timestamp: tx.timestamp,
        };
      })}
      ethereumConnectorInUse={connectorType}
      connectedAccountNativeBalance={balance}
      onDisconnectDotsamaWallet={deactivate}
      onConnectPolkadotWallet={activate}
      blockchainNetworksSupported={BLOCKCHAIN_NETWORKS_SUPPORTED}
      supportedPolkadotWallets={POLKADOT_WALLETS_SUPPORTED}
      supportedEthereumWallets={ETHEREUM_WALLETS_SUPPORTED}
      polkadotAccounts={accounts.get("picasso") ?? []}
      ethereumConnectedAccount={account}
      onConnectEthereumWallet={biLibConnector.activate as any}
      isEthereumWalletActive={
        biLibConnector.isActive ? biLibConnector.isActive : false
      }
      polkadotExtensionStatus={"connected"}
      selectedPolkadotAccount={
        accounts.get("picasso")?.[selectedAccount] ?? undefined
      }
      onDisconnectEthereum={biLibConnector.deactivate}
      onSelectPolkadotAccount={(account: InjectedAccountWithMeta) => {
        const index =
          accounts
            .get("picasso")
            ?.findIndex((_account) => account.address === _account.address) ??
          -1;
        if (index >= 0 && setSelectedIndex) {
          setSelectedIndex(index);
        }
      }}
    />
  );
};
