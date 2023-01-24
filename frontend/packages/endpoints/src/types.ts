export type EndpointPreset = "local" | "stage" | "mainnet" | "dali";
export type AvailableEndpoints =
  | "picasso"
  | "kusama"
  | "karura"
  | "subsquid"
  | "statemine";

export type EndpointPresets = Record<
  EndpointPreset,
  Record<AvailableEndpoints, string>
>;

export type StoreState = {
  current: EndpointPresets[EndpointPreset];
};
