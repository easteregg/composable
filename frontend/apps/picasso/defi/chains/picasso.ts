import { ApiPromise, WsProvider } from "@polkadot/api";
import config from "@/constants/config";
import * as definitions from "defi-interfaces/definitions";

const rpc = Object.keys(definitions)
  .filter((k) => {
    if (!(definitions as any)[k].rpc) {
      return false;
    } else {
      return Object.keys((definitions as any)[k].rpc).length > 0;
    }
  })
  .reduce(
    (accumulator, key) => ({
      ...accumulator,
      [key]: (definitions as any)[key].rpc,
    }),
    {}
  );

const types = Object.keys(definitions)
  .filter((key) => Object.keys((definitions as any)[key].types).length > 0)
  .reduce(
    (accumulator, key) => ({
      ...accumulator,
      ...(definitions as any)[key].types,
    }),
    {}
  );

export function createPicassoApi() {
  const wsProvider = new WsProvider(config.networks.picasso.wsUrl);

  return ApiPromise.create({
    provider: wsProvider,
    rpc,
    types,
  });
}
