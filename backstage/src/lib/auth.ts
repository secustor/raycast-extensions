import { getPreferenceValues, OAuth } from "@raycast/api";
import { OAuthService, withAccessToken } from "@raycast/utils";
import { Preferences } from "./types";
import { useEffect } from "react";

const preferences = getPreferenceValues<Preferences>();

export const client = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.App,
  providerName: "Okta",
  providerIcon: "okta-icon.png",
  description: "Connect to your Backstage instance",
});

const provider = new OAuthService({
  client,
  clientId: preferences.appID!,
  scope: "openid offline_access",
  authorizeUrl: `https://${preferences.oAuthDomain}/oauth2/v1/authorize`,
  tokenUrl: `https://${preferences.oAuthDomain}/oauth2/v1/token`,
  refreshTokenUrl: `https://${preferences.oAuthDomain}/oauth2/v1/authorize`,
  bodyEncoding: "url-encoded",
});

export const withAuth = (wrappedComponent: React.ComponentType) => {
  // static API token
  const personalAccessToken = preferences.apiToken;
  if (personalAccessToken) {
    return withAccessToken({
      authorize: async () => personalAccessToken,
    })(wrappedComponent);
  }

  // do not use any auth
  if (preferences.provider === "none") {
    return wrappedComponent;
  }


  useEffect(() => {
    (async () => {
      try {
        const tokenSet = await client.getTokens();
        if (tokenSet?.isExpired() ?? true) {
          const refreshedToken = await provider.authorize()
          console.log("Token refreshed", refreshedToken);
        } else {
          console.log("Token is still valid");
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [provider]);

  return withAccessToken(provider)(wrappedComponent);
};
