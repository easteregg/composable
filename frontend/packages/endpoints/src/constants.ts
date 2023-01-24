import { EndpointPresets } from "./types";

export const endpointPresets = {
  local: {
    picasso: "ws://127.0.0.1:9988",
    karura: "ws://127.0.0.1:9999",
    kusama: "ws://127.0.0.1:9944",
    statemine: "ws://127.0.0.1:10009",
    subsquid: "http://localhost:4350/graphql",
  },
  dali: {
    picasso: "wss://persistent.devnets.composablefinance.ninja/chain/dali",
    karura: "wss://persistent.devnets.composablefinance.ninja/chain/karura",
    kusama: "wss://persistent.devnets.composablefinance.ninja/chain/rococo",
    statemine:
      "wss://persistent.devnets.composablefinance.ninja/chain/statemine",
    subsquid:
      "https://persistent.devnets.composablefinance.ninja/subsquid/graphql",
  },
  stage: {
    picasso:
      "wss://persistent.picasso.devnets.composablefinance.ninja/chain/picasso",
    karura:
      "wss://persistent.picasso.devnets.composablefinance.ninja/chain/karura",
    kusama:
      "wss://persistent.picasso.devnets.composablefinance.ninja/chain/rococo",
    statemine:
      "wss://persistent.picasso.devnets.composablefinance.ninja/chain/statemine",
    subsquid:
      "https://persistent.picasso.devnets.composablefinance.ninja/subsquid/graphql",
  },
  mainnet: {
    picasso: "wss://picasso-rpc-lb.composablenodes.tech",
    karura: "wss://karura-rpc-0.aca-api.network",
    kusama: "wss://kusama-rpc.polkadot.io",
    statemine: "wss://statemine-rpc.polkadot.io",
    subsquid: "https://stats.composablenodes.tech/graphql",
  },
} as EndpointPresets;

export const CURRENT_STORE_VERSION = 1;
