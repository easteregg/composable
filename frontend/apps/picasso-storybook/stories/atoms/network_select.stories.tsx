import { NetworkSelect, NetworkSelectProps } from "picasso/components";
import { SUBSTRATE_NETWORK_IDS } from "picasso/defi/polkadot/Networks";
import { Box, SxProps } from "@mui/material";
import { Story } from "@storybook/react";
import { useState } from "react";
import config from "picasso/constants/config";

const NetworkSelectsStories = (props: NetworkSelectProps) => {
  const boxStyle: Partial<SxProps> = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    resize: "both",
    overflow: "auto",
    padding: 2,
  };

  const [value, setValue] = useState(
    props.substrateNetwork
      ? SUBSTRATE_NETWORK_IDS[0]
      : config.defiConfig.networkIds[0]
  );

  return (
    <Box sx={boxStyle}>
      <NetworkSelect value={value} setValue={setValue} {...props} />
      <NetworkSelect
        value={config.defiConfig.networkIds[0]}
        {...props}
        disabled
      />
    </Box>
  );
};
export default {
  title: "atoms/NetworkSelect",
  component: NetworkSelect,
};

const Template: Story<typeof NetworkSelectsStories> = (args) => (
  <NetworkSelectsStories {...args} />
);

export const NetworkSelects = Template.bind({});
NetworkSelects.args = {
  searchable: true,
  options: config.defiConfig.networkIds.map((networkId) => ({
    networkId: networkId,
  })),
};

export const SubstrateNetworkSelect = Template.bind({});
SubstrateNetworkSelect.args = {
  searchable: true,
  substrateNetwork: true,
  options: SUBSTRATE_NETWORK_IDS.map((networkId) => ({ networkId: networkId })),
};
