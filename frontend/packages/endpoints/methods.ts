import { AvailableEndpoints, EndpointPreset } from "./src/types";
import { getCurrent, setCurrent } from "./src";

export function getEnvironment(target: AvailableEndpoints) {
  return getCurrent(target); // This is just to keep the old code working.
}

export function setEndpointPreset(endpointPreset: EndpointPreset) {
  setCurrent(endpointPreset); // This is just to keep the old code working.
}
