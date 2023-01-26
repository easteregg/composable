import { SubstrateNetworkId } from "shared";
import config from "@/constants/config";
import { ApiPromise } from "@polkadot/api";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

async function bootstrapApi() {
  return config.supportedChains.reduce(async (acc, cur) => {
    const [networkId, api] = cur;
    return {
      ...acc,
      [networkId]: await api(),
    };
  }, {}) as Record<SubstrateNetworkId, ApiPromise>;
}

type ApiStore = {
  apis: Partial<Record<SubstrateNetworkId, ApiPromise>>;
  isLoading: boolean;
};

const initialize = () => ({
  apis: {},
  isLoading: true,
});

const apiStore = create<ApiStore>()(
  devtools(subscribeWithSelector(immer(initialize)))
);

export const useAllApis = () =>
  apiStore((store) => ({
    data: store.apis,
    isLoading: store.isLoading,
  }));

export const unsubscribeApi = apiStore.subscribe(
  (state) => state.isLoading,
  async (isLoading) => {
    if (isLoading) return;
    const loaded = await bootstrapApi();
    useApi.setState((state) => ({
      apis: loaded,
      isLoading: false,
    }));
  },
  {
    fireImmediately: true,
  }
);
