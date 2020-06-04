import { OAuthModuleConfig } from "angular-oauth2-oidc";

export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: [
      "https://accounts.inftec.ch/auth/realms/pwa-poc/protocol/openid-connect/userinfoX",
    ],
    sendAccessToken: true,
  },
};
