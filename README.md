# Ionic POC

## Development

The application works with Node **12.x**.

### IDE Setup

#### Visual Studio Code

The following plugins are recommended:

- **Angular Language Service**: Angular template support
- **Prettier - Code formatter**: Automatic code formatting
- **TSLint**: Linting support for IDE

The following workspace settings (`.vscode/settings.json`) are recommended:

    {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.codeActionsOnSave": {
        "source.fixAll.tslint": true
      },
      "editor.rulers": [80]
    }

These settings will make Visual Studio Code automatically format code (using Prettier)
and auto-fix linting issues on save.

### Running

To run the application locally:

- `npm install`
- `npm start`

#### Run as PWA

When we use `ng serve` (as in `npm start`), the application will not work with service
workers. For this, we must use a separate HTTP server:

- `npm run build:prod`
- `npm run serve:pwa`
- Open application at <http://localhost:8080>. Note that we do not have
  automatic SPA to `/index.html` redirection, so specific routes
  will not work in this modes.

## Deployment

The application will be deployed to Firebase and is accessible at:
<https://inftec-ionic-poc.web.app>

### Manual deployment

To run deployment from a local machine, follow these steps:

1. Login to Firebase
   - `npm install -g firebase`
   - `firebase login`
2. Build application: `npm run build:prod`
3. Deploy: `npm run deploy`

### Github Actions

#### Initial Setup

- Create firebase token: `firebase login:ci`
- Goto Settings of GibHub Repo and add Secret _FIREBASE_TOKEN_ with the generated token as value
- Adapt workflow yaml to expose token as ENV variable

## Post setup notes

Your Ionic app is ready! Follow these next steps:

- Go to your new project: cd .\ionic-poc
- Run ionic serve within the app directory to see your app in the browser
- Run ionic capacitor add to add a native iOS or Android project using Capacitor
- Generate your app icon and splash screens using cordova-res --skip-config --copy
- Explore the Ionic docs for components, tutorials, and more: <https://ion.link/docs>
- Building an enterprise app? Ionic has Enterprise Support and Features: <https://ion.link/enterprise-edition>

## Authentication

### Keycloak Setup

We're using the InfTec internal Keycloak for OAuth2 authentication testing.

A dedicated client in the existing tecton realm have been created.

#### Client in AST Realm

- Client-ID: _pwa-poc_
- Client Protocol: _openid-connect_
- Valid Redirect URLs:
  - _http://localhost:4200/index.html_
  - _https://inftec-ionic-poc.web.app/index.html_
- Web Origins:
  - _http://localhost:4200_
  - _https://inftec-ionic-poc.web.app_
- Direct Access Grants Enabled: _false_
- Access Token Lifespan: _1 minute_ (better for testing)
