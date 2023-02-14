import { useStore } from "@/stores/root";
import { fromChainIdUnit } from "shared";

export function subscribeXPicaAPR() {
  return useStore.subscribe(
    (store) => ({
      rewardPool: store.rewardPools[1],
      tvl: store.maximumPicaStaked,
    }),
    ({ tvl, rewardPool }) => {
      const rewardsPerSec = rewardPool?.rewards?.[1]?.rewardRate?.amount;
      if (!tvl || !rewardsPerSec) return;
      if (tvl.eq(0)) return;

      const SECONDS_PER_YEAR = 365 * 24 * 60 * 60;
      useStore.setState((state) => {
        const upperBracket = fromChainIdUnit(
          rewardsPerSec.toString()
        ).multipliedBy(SECONDS_PER_YEAR);
        const apr = upperBracket.div(tvl).multipliedBy(100).toFormat(2);
        state.xPICAAPR = `${apr}%`;
      });
    },
    {
      fireImmediately: true,
    }
  );
}
