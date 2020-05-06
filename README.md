# Ionic POC

## IDE Setup

### Visual Studio Code

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
