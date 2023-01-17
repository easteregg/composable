import { useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { FeaturedBox } from "../../Molecules/FeaturedBox";
import { useWallet } from "@/defi/queries/defi/useWallet";

export const CrowdloanRewardsFeaturedBox: React.FC<{}> = () => {
  const theme = useTheme();
  const router = useRouter();
  const { isConnected } = useWallet();

  return (
    <FeaturedBox
      title="Crowdloan Rewards"
      textBelow="Claim your PICA rewards for both KSM and stablecoin contributions."
      horizontalAligned
      ButtonProps={{
        label: "Claim rewards",
        onClick: () => {
          router.push("/crowdloan-rewards");
        },
        variant: "contained",
        disabled: !isConnected,
      }}
      sx={{
        padding: theme.spacing(6),
      }}
    />
  );
};
