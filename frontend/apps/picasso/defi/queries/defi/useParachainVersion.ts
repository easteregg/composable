import { useQuery } from "@tanstack/react-query";
import { usePicassoApi } from "@/defi/queries/defi/usePicassoApi";

export function useParachainVersion() {
  const { data: api } = usePicassoApi();
  return useQuery({
    queryKey: ["parachain-version", api],
    queryFn: () => {
      return api!.rpc.system.version().then((result) => result.toString());
    },
  });
}
