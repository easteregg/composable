import config from "@/constants/config";

type SupportedNetwork = typeof config.supportedChains[number][0];

export async function getApi(which: SupportedNetwork) {
  const found = config.supportedChains.find(([network]) => network === which);
  if (!found) throw new Error("API is not supported.");

  return await found[1]();
}
