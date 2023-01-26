import { ApiPromise, WsProvider } from "@polkadot/api";
import config from "@/constants/config";

export function createKusamaApi() {
  const wsProvider = new WsProvider(config.networks.kusama.wsUrl);

  return ApiPromise.create({
    provider: wsProvider,
  });
}
