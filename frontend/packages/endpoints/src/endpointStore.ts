import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AvailableEndpoints, EndpointPreset, StoreState } from "./types";
import { CURRENT_STORE_VERSION, endpointPresets } from "./constants";

function getInitialState() {
  return {
    current: endpointPresets.mainnet,
  } as StoreState;
}

const storeCreator = () => ({
  ...getInitialState(),
});

export const useEndpoint = create<StoreState>()(
  devtools(
    persist(storeCreator, {
      name: "endpoint-store",
      version: CURRENT_STORE_VERSION, // This version should change if a change in structure is happening
      migrate: (persistedState, version) => {
        return Object.assign(
          {},
          persistedState,
          version !== CURRENT_STORE_VERSION ? getInitialState() : {}
        ) as StoreState;
      },
    })
  )
);

export function getCurrent(target: AvailableEndpoints) {
  const { current } = useEndpoint.getState();

  return current[target];
}

export function setCurrent(which: EndpointPreset) {
  useEndpoint.setState({
    current: endpointPresets[which],
  });
}
