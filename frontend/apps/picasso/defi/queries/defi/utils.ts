import { getEnvironment } from "endpoints";
import { ApiPromise, WsProvider } from "@polkadot/api";
import * as definitions from "defi-interfaces/definitions";

export function createPicassoApi() {
  const wsProvider = new WsProvider(getEnvironment("picasso"));
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

  return ApiPromise.create({
    provider: wsProvider,
    rpc,
    types,
  });
}

export function createKusamaApi() {
  const wsProvider = new WsProvider(getEnvironment("kusama"));

  return ApiPromise.create({
    provider: wsProvider,
  });
}

export function createStatemineApi() {
  const wsProvider = new WsProvider(getEnvironment("statemine"));

  return ApiPromise.create({
    provider: wsProvider,
  });
}
