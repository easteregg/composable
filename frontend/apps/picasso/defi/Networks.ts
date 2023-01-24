import config from "@/constants/config";

export const getNetwork = (networkId: keyof typeof config.evmNetworks) =>
  config.evmNetworks[networkId];
