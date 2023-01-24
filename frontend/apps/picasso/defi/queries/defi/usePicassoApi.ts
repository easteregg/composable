import { useQuery } from "@tanstack/react-query";
import { ApiPromise } from "@polkadot/api";

import { SubstrateNetworkId } from "shared";
import {
  createKusamaApi,
  createPicassoApi,
  createStatemineApi,
} from "@/defi/queries/defi/utils";

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
