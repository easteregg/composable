import { useStore } from "@/stores/root";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import { tryFetchRewardPool } from "@/defi/polkadot/pallets/StakingRewards";
import { ApiPromise } from "@polkadot/api";
import { flow } from "fp-ts/function";
import { TokenMetadata } from "@/stores/defi/polkadot/tokens/slice";

export const subscribeRewardPools = (parachainApi: ApiPromise | undefined) =>
  useStore.subscribe(
    (store) => ({
      isTokensLoaded: store.substrateTokens.isLoaded,
      pica: store.substrateTokens.tokens.pica,
    }),
    ({ isTokensLoaded, pica }) => {
      const task = pipe(
        parseRequirements(parachainApi, isTokensLoaded, pica),
        O.map(({ api, assetId }) =>
          pipe(
            tryFetchRewardPool(api, assetId),
            TE.map((rewardPool) =>
              useStore.getState().setRewardPool(assetId, rewardPool)
            )
          )
        )
      );

      pipe(
        task,
        O.map((t) =>
          t().then(
            flow(
              E.fold(
                (e) => {
                  console.error(e);
                  useStore.setState((state) => {
                    state.isRewardPoolLoaded = true;
                  });
                },
                () => {
                  console.log("Staking rewards loaded.");
                }
              )
            )
          )
        )
      );
    },
    {
      fireImmediately: true,
      equalityFn: (a, b) =>
        a.isTokensLoaded === b.isTokensLoaded && b.isTokensLoaded,
    }
  );

function parseRequirements(
  parachainApi: ApiPromise | undefined,
  isTokensLoaded: boolean,
  pica: TokenMetadata
) {
  return pipe(
    O.Do,
    O.bind(
      "isLoaded",
      O.fromPredicate(() => isTokensLoaded)
    ),
    O.bind("assetId", () => O.fromNullable(pica.chainId.picasso?.toString())),
    O.bind("api", () => O.fromNullable(parachainApi))
  );
}
