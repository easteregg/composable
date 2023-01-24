import { QueryClient } from "@tanstack/react-query";
import config from "@/constants/config";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: config.tsQuery,
  },
});
