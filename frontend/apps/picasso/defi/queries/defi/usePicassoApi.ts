import { useQuery } from "@tanstack/react-query";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { getEnvironment } from "shared/endpoints";
import * as definitions from "defi-interfaces/definitions";

function createPicassoApi() {
  return () => {
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
  };
}

export const usePicassoApi = () => {
  return useQuery({
    queryKey: ["picasso-api"],
    queryFn: createPicassoApi(),
    staleTime: 60 * 60 * 1000, // 1 Hour
    refetchInterval: 60 * 60 * 1000, // 1 hour
  });
};
