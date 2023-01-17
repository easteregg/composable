import { useQuery } from "@tanstack/react-query";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { getEnvironment } from "shared/endpoints";
import * as definitions from "defi-interfaces/definitions";
import { SubstrateNetworkId } from "shared";

function createPicassoApi() {
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

function createKusamaApi() {
  const wsProvider = new WsProvider(getEnvironment("kusama"));

  return ApiPromise.create({
    provider: wsProvider,
  });
}

function createStatemineApi() {
  const wsProvider = new WsProvider(getEnvironment("statemine"));

  return ApiPromise.create({
    provider: wsProvider,
  });
}

export const useApi = () => {
  return useQuery({
    queryKey: ["api-providers"],
    queryFn: async () => {
      return {
        picasso: await createPicassoApi(),
        kusama: await createKusamaApi(),
        statemine: await createStatemineApi(),
      } as Record<SubstrateNetworkId, ApiPromise>;
    },
    staleTime: 60 * 60 * 1000, // 1 Hour
    refetchInterval: 60 * 60 * 1000, // 1 hour
  });
};
