import { getNetwork } from "@/defi/Networks";
import { render, screen } from "@/tests/utils/base";
import { composeStories } from "@storybook/testing-react";
import * as stories from "picasso-storybook/stories/atoms/network_tabs.stories";
import config from "@/constants/config"; // import all stories from the stories file

const { DefaultNetworkTabs } = composeStories(stories);

test("renders Network Tabs", () => {
  render(<DefaultNetworkTabs />);
  expect(
    screen.getByText(getNetwork(config.defiConfig.networkIds[0]).name)
  ).toBeInTheDocument();
  expect(
    screen.getByText(getNetwork(config.defiConfig.networkIds[1]).name)
  ).toBeInTheDocument();
  expect(
    screen.getByText(getNetwork(config.defiConfig.networkIds[2]).name)
  ).toBeInTheDocument();
});
