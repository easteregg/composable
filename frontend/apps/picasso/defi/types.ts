import { TokenId } from "tokens";
import { SubstrateNetworkId } from "@/defi/polkadot/types";

export type AllowedTransferList = {
  [key in SubstrateNetworkId]: Record<SubstrateNetworkId, Array<TokenId>>;
};
