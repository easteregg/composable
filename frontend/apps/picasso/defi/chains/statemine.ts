import { ApiPromise, WsProvider } from "@polkadot/api";

import config from "@/constants/config";

export function createStatemineApi() {
  const wsProvider = new WsProvider(config.networks.statemine.wsUrl);

  return ApiPromise.create({
    provider: wsProvider,
  });
}
