import { SubstrateNetwork, SubstrateNetworkId } from "./types";
import config from "@/constants/config";

export const SUBSTRATE_NETWORK_IDS: Array<SubstrateNetworkId> = Object.keys(
  config.networks
) as Array<SubstrateNetworkId>;

export const getSubstrateNetwork = (
  networkId: SubstrateNetworkId
): SubstrateNetwork => config.networks[networkId];

export function subscanAccountLink(
  network: SubstrateNetworkId,
  account: string
): string {
  return config.networks[network].subscanUrl + "account/" + account;
}
