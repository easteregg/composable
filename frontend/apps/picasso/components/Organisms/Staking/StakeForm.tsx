import { Button, Stack, Typography, useTheme } from "@mui/material";
import { StakeInputLabel } from "@/components/Organisms/Staking/StakeInputLabel";
import { AlertBox, BigNumberInput } from "@/components";
import { LockPeriodInput } from "@/components/Organisms/Staking/LockPeriodInput";
import { FutureDatePaper } from "@/components/Atom/FutureDatePaper";
import { WarningAmberRounded } from "@mui/icons-material";

type StakeFormProps = {
  amount: any;
  pica: any;
  valid: () => void;
  setter: any;
  value: any;
  options: any;
  picaRewardPool: any;
  duration: any;
  hasRewardPools: boolean;
  min: number;
  max: number;
  onChange: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => any;
  onClick: () => void;
  formValid: any;
};

export function StakeForm({
  amount,
  pica,
  valid,
  setter,
  value,
  options,
  picaRewardPool,
  duration,
  hasRewardPools,
  min,
  max,
  onChange,
  onClick,
  formValid,
}: StakeFormProps) {
  const theme = useTheme();
  const shouldShowWarning = duration !== "0";
  return (
    <Stack sx={{ marginTop: theme.spacing(9) }} gap={4}>
      <Stack gap={1.5}>
        <StakeInputLabel amount={amount} pica={pica} />
        <BigNumberInput
          isValid={valid}
          setter={setter}
          maxValue={amount}
          value={value}
          tokenId={pica.id}
          InputProps={{
            sx: {
              "& .MuiOutlinedInput-input": {
                textAlign: "center",
              },
            },
          }}
          maxDecimals={pica.decimals.picasso ?? undefined}
        />
      </Stack>
      {/*  Radiobutton groups*/}
      <LockPeriodInput
        options={options}
        picaRewardPool={picaRewardPool}
        duration={duration}
        hasRewardPools={hasRewardPools}
        min={min}
        max={max}
        onChange={onChange}
      />
      <Typography variant="body2">Unlock date</Typography>
      <FutureDatePaper duration={duration} />
      {shouldShowWarning && (
        <AlertBox
          status="warning"
          icon={<WarningAmberRounded color="warning" />}
        >
          <Typography variant="body2">Warning</Typography>
          <Typography variant="inputLabel" color="text.secondary">
            Your {pica.symbol} will be locked until the expiry date.
          </Typography>
        </AlertBox>
      )}
      <Button
        fullWidth
        onClick={onClick}
        variant="contained"
        color="primary"
        disabled={!formValid}
      >
        <Typography variant="button">Stake and mint</Typography>
      </Button>
    </Stack>
  );
}
