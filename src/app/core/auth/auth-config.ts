import { AuthConfig } from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
  issuer: "https://demo.identityserver.io",
  clientId: "spa", // The "Auth Code + PKCE" client
  responseType: "code",
  redirectUri: window.location.origin + "/index.html",
  scope: "openid profile email api offline_access", // Ask offline_access to support refresh token refreshes
  useSilentRefresh: false, // Doesn't work anymore with latest Safari cookie security
  timeoutFactor: 0.25, // For faster testing
  sessionChecksEnabled: true,
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
  nonceStateSeparator: "semicolon", // Real semicolon gets mangled by IdentityServer's URI encoding
};
