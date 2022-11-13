import {Auth} from "@aws-amplify/auth";
import SDKWidget from "@leanspace/dashboard-sdk/lib/vanilla/index.es";
import "@leanspace/dashboard-sdk/lib/vanilla/style.css";
import React, { useEffect } from "react";
import { API_BASE_URL, TENANT } from "../config";

const getToken = async () => {
  const user = await Auth.currentAuthenticatedUser({
    bypassCache: false,
  });

  const {
    accessToken: { jwtToken },
  } = user.signInUserSession;
  return jwtToken;
};

const LeanspaceWidget = ({
  widgetId, // You can get this widget id by going to a dashboard and clicking on the three dots next to the widget, and then clicking "Copy widget identifier"
}) => {
  const [token, setToken] = React.useState(null);

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

  return (
    <>
      {token && (
        <SDKWidget
          onTokenRefreshRequest={getToken}
          apiToken={token}
          apiUrl={API_BASE_URL}
          tenantId={TENANT}
          widgetConfiguration={widgetId}
          dateRange='from 500 minutes ago to now'
          onDateRangeChange={() => {}}
          shouldUseStaticResults={false}
        />
      )}
    </>
  );
};

export default LeanspaceWidget;
