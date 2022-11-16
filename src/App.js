// This is the main component of the application.
// Authentication and global configurations are done here. This is where you would add routing when it's time to split your app into multiple pages.

import { Auth } from "@aws-amplify/auth";
import { Amplify } from "@aws-amplify/core";
import { AWS_REGION, API_BASE_URL } from "./config";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";

import { fetchTenantInformations } from "./API";

import Login from "./Components/Login";
import Main from "./Components/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TLE from "./Components/tle";
import Home from "./Components/Home";
import Groundstations from "./Components/Groundstations";

import { UserContext } from "./Contexts/UserContext";

import { QueryClient, QueryClientProvider } from "react-query";
import { LeanspaceProvider } from "@leanspace/js-client/dist/react";

const getToken = async () => {
  const user = await Auth.currentAuthenticatedUser({
    bypassCache: false,
  });

  const {
    accessToken: { jwtToken },
  } = user.signInUserSession;
  return jwtToken;
};

const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#e64316",
    },
    secondary: {
      main: "#5AA9E6",
    },
    error: {
      main: "#6E0D25",
    },
    warning: {
      main: "#F0A202",
    },
  },
});

function App() {
  const [isAmplifyReady, setAmplifyReady] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, updateToken] = useState(null);
  const [didNotFindTenant, setDidNotFindTenant] = useState(false);

  const [time, setTime] = useState(600000);

  const [countDownData, setCountdownData] = useState({
    minutes: 0,
    seconds: 0,
    millis: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time => {
        if (time < 0) {
          clearInterval(interval);
          setCountdownData({ ...countDownData, minutes: 0, seconds: 0, millis: 0 });
          return 0;
        } else {
          setCountdownData({
            ...countDownData, minutes: [Math.floor(time / 1000 / 60)],
            seconds: [Math.floor((time / 1000) % 60)], millis: [time % 99]
          });
          return time - 60;
        }

      });
    }, 60);
    return e => clearInterval(interval);
  }, []);



  useEffect(function loadTenantConfig() {
    setDidNotFindTenant(false);
    const load = async () => {
      try {
        const tenantInfos = await fetchTenantInformations();
        await Amplify.configure({
          Auth: {
            ...tenantInfos.authInfo,
            userPoolWebClientId: tenantInfos.authInfo.clientAppId,
            region: tenantInfos.authInfo.region || AWS_REGION,
            accountId: tenantInfos.tenantKey,
          },
        });
        setAmplifyReady(true);

        const currentUser = await Auth.currentAuthenticatedUser();
        if (currentUser.signInUserSession) {
          const {
            accessToken: { jwtToken },
          } = currentUser.signInUserSession;
          updateToken(jwtToken);
          setLoggedIn(true);
          getToken();
        }
      } catch (error) {
        setDidNotFindTenant(true);
      }
    };
    load();
  }, []);

  const onLogin = (token) => {
    updateToken(token);
    setLoggedIn(true);
  };

  const contextValue = {
    token,
    login: onLogin,
    isLoggedIn,
  };

  return isAmplifyReady ? (
    <ThemeProvider theme={darkTheme}>
      <UserContext.Provider value={contextValue}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          {isLoggedIn ? (
            <LeanspaceProvider
              clientOptions={{ getToken, baseURL: API_BASE_URL }}
            >
              <BrowserRouter>
                <Routes>
                  <Route path="/">
                    <Route index element={<Home countDownData={countDownData} />} />
                    <Route path="sattelites" element={<Main />} />
                    {/* <Route path="home" element={<Home />} /> */}
                    <Route path="tle" element={<TLE />} />
                    <Route path="ground-stations" element={<Groundstations />} />
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </LeanspaceProvider>
          ) : (
            <Login />
          )}
        </QueryClientProvider>
      </UserContext.Provider>
    </ThemeProvider>
  ) : didNotFindTenant ? (
    "Failed to load tenant information — did you update the config.js file?"
  ) : null;
}

export default App;
