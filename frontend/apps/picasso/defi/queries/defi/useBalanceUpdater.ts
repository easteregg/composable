import { useQuery } from "@tanstack/react-query";
import {
  picassoAssetsList,
  statemineAssetList,
} from "@/defi/polkadot/pallets/Assets";
import { useStore } from "@/stores/root";
import { kusamaAssetsList } from "@/defi/polkadot/pallets/Assets/kusama";
import { getApi } from "@/defi/chains";

export const useAssetTokens = () => {
  const { updateTokens, tokens } = useStore((store) => store.substrateTokens);

  const { isLoading } = useQuery({
    queryKey: ["picasso-tokens"],
    queryFn: async () => {
      const assets = await Promise.all([
        picassoAssetsList(await getApi("picasso")),
        statemineAssetList(await getApi("statemine")),
        kusamaAssetsList(await getApi("kusama")),
      ]);

      updateTokens(...assets);
    },
  });

  return tokens;
};
