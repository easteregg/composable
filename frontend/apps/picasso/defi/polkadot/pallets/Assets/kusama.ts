import { ApiPromise } from "@polkadot/api";
import BigNumber from "bignumber.js";
import { fromChainIdUnit, unwrapNumberOrHex } from "shared";
import config from "@/constants/config";

export type KusamaAsset = {
  chainId: string;
  decimals: number;
  name: string;
  symbol: string;
  existentialDeposit: BigNumber;
};

export function kusamaAssetsList(api: ApiPromise): Promise<KusamaAsset> {
  const existentialDeposit = api.consts.balances.existentialDeposit;
  return new Promise((res) => {
    res({
      chainId: "1",
      name: config.networks.kusama.tokenId,
      decimals: config.networks.kusama.decimals,
      symbol: config.networks.kusama.symbol,
      existentialDeposit: fromChainIdUnit(
        unwrapNumberOrHex(existentialDeposit.toString()),
        config.networks.kusama.decimals
      ),
    });
  });
}
