import { client as apolloClient } from "@/apollo/apolloGraphql";
import { ThemeResponsiveSnackbar } from "@/components/Molecules/Snackbar";
import SubstrateBalancesUpdater from "@/stores/defi/polkadot/balances/PolkadotBalancesUpdater";
import CrowdloanRewardsUpdater from "@/stores/defi/polkadot/crowdloanRewards/CrowdloanRewardsUpdater";
import createEmotionCache from "@/styles/createEmotionCache";
import { getDesignTokens } from "@/styles/theme";
import { ApolloProvider } from "@apollo/client";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BlockchainProvider } from "bi-lib";
import "defi-interfaces";
import { AppProps } from "next/app";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import { QueryClientProvider } from "@tanstack/react-query";

import * as React from "react";
import { useMemo } from "react";
import { queryClient } from "@/defi/queries/setup";
import config from "@/constants/config";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const theme = useMemo(() => createTheme(getDesignTokens("dark")), []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BlockchainProvider
          blockchainInfo={Object.entries(config.evmNetworks).map(
            ([netId, net]) => {
              return {
                chainId: +netId,
                rpcUrl: net.rpcUrl,
              };
            }
          )}
        >
          <QueryClientProvider client={queryClient}>
            <ApolloProvider client={apolloClient}>
              <SubstrateBalancesUpdater />
              <CrowdloanRewardsUpdater />
              <SnackbarProvider
                Components={{
                  info: ThemeResponsiveSnackbar,
                  success: ThemeResponsiveSnackbar,
                  error: ThemeResponsiveSnackbar,
                  warning: ThemeResponsiveSnackbar,
                }}
                autoHideDuration={null}
                maxSnack={4}
                disableWindowBlurListener={true}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <Component {...pageProps} />
              </SnackbarProvider>
            </ApolloProvider>
          </QueryClientProvider>
        </BlockchainProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
