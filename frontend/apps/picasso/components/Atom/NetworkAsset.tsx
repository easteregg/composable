import React from "react";
import { BaseAsset, BaseAssetProps } from "./BaseAsset";
import { getNetwork } from "@/defi/Networks";
import config from "@/constants/config";

export type NetworkAssetProps = {
  networkId: typeof config.defiConfig.networkIds[number];
} & BaseAssetProps;

export const NetworkAsset: React.FC<NetworkAssetProps> = ({
  networkId,
  icon,
  label,
  ...rest
}) => {
  const network = getNetwork(networkId);
  return (
    <BaseAsset
      icon={icon || network.logo}
      label={label || network.name}
      {...rest}
    />
  );
};

NetworkAsset.defaultProps = {
  iconSize: 24,
};
