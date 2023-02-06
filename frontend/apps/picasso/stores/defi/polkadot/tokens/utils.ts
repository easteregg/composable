import { useStore } from "@/stores/root";

export function getPicassoTokenById(assetId: string) {
  const tokens = useStore.getState().substrateTokens.tokens;

  return Object.values(tokens).find(
    (token) => token.chainId.toString() === assetId
  );
}
