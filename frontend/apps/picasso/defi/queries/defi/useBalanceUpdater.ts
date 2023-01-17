import { useApi } from "@/defi/queries/defi/usePicassoApi";
import { useQuery } from "@tanstack/react-query";
import {
  picassoAssetsList,
  statemineAssetList,
} from "@/defi/polkadot/pallets/Assets";
import { useStore } from "@/stores/root";
import { kusamaAssetsList } from "@/defi/polkadot/pallets/Assets/kusama";

export const useAssetTokens = () => {
  const { data: api } = useApi();
  const { updateTokens, tokens } = useStore((store) => store.substrateTokens);

  const { isLoading } = useQuery({
    queryKey: ["picasso-tokens", api],
    queryFn: async () => {
      const assets = await Promise.all([
        picassoAssetsList(api!.picasso),
        statemineAssetList(api!.statemine),
        kusamaAssetsList(api!.kusama),
      ]);

      updateTokens(...assets);
    },
  });

  return tokens;
};
