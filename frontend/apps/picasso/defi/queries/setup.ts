import { QueryClient } from "@tanstack/react-query";
import {
  DEFAULT_REFRESH_TIME,
  DEFAULT_STALE_TIME,
} from "@/defi/queries/config";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: DEFAULT_REFRESH_TIME,
      staleTime: DEFAULT_STALE_TIME,
      refetchOnReconnect: "always",
    },
  },
});
