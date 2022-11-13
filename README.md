# React Starter Kit (Read fully before using)

[...]

## Installation

To install the starter kit, first, make sure that you have nodeJS and NPM installed on your device.

1. Unpack the zip file containing the repository and save it where is most suitable for you. <br><br>

2. Open up the folder of the cloned repository in your code editor terminal and type the command: `NPM INSTALL` <br>

> If you encounter an error, please reach out to us on Slack

3. Test the app by running it the first time with the command `NPM RUN START` in your code editor terminal.

### Configuration

For this tutorial I will be utilizing VS Code on WSL Ubuntu, which may look a little different to the code editor that you are familiar with but the concepts should be the same.

There a 3 files that you need to be aware of when first starting:

- config.js - containing your tenant name and server details, please check this file and the comment within it.
- .npmrc - will contain your Leanspace access token
- .gitignore - which specifies which files Git ignores when pushing to Github

1. Right click the react-starter-kit folder at the top and click on create new file called **.npmrc** <br><br>
2. Open up .npmrc and copy in this text:

```json
registry=https://registry.npmjs.org/
@leanspace:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=INSERTTOKENHERE
```

3. After “\_authToken=” add your Leanspace access token. It will look like a long string of text. If you do not have this, contact Leanspace support and we will issue you with one.<br><br>

4. Next close this file and open up .gitignore <br><br>

5. This will contain a list of everything that Git should ignore when pushing code. Check and see if .npmrc is there. If it isn’t, type .npmrc at the bottom of the file and save.

> It’s very important that you do this to ensure your access token is not published, otherwise this introduces a security risk and we’ll have to issue a new code.

6. Next close this file and open up config.js

```json
export const TENANT = "YOUR TEAM";

// You probably don't need to change these
export const API_BASE_URL = `https://api.demo.leanspace.io`;
export const AWS_REGION = "eu-central-1";
```

7. On line 1 where it says export const TENANT = “YOUR TEAM”; add your team’s name between the apostrophes and save.

## Getting to know the Starter Kit

As mentioned earlier, the React Starter Kit is essentially a barebones application with some APIs already set up and connected to Leanspace. It has been bootstraped using Create-React-App, which means it also has the ‘scaffolding’ necessary for everything to work behind the scenes.

Whilst you are welcome to install additional packages, note that the starter kit has not been tested outside of its current requirements.

As a broad overview of the app:

- src contains the majority of the files for your app

- App.js is the starting point of the application, which uses the Main.jsx component to render the page.

- Components folder contains some basics to get you started such as the Login page or the LeanspaceWidget.

As you develop the app, feel free to expand and sub-divide this folder as you need.

When entering commands there are also previews depending on the code editor that you use

### Material UI

This starter kit utilizes the Material UI package.

It simplifies some of the UI components so that you can focus on your goals rather than worrying about why something isn’t aligning properly in css.

There’s a great 45 min tutorial on how to use Material UI below <br><br>[here](https://www.youtube.com/watch?v=vyJU9efvUtQ)

The Material UI documentation can be found [here](https://mui.com/material-ui/getting-started/overview/).

### Rendering Widgets

Widgets are pre-designed images that can showcase data from your satellites and groundstations. They come in:

- Bar, Line and Area graphs
- Tables
- Values
- A render of The Earth
- Gauges

The starter kit makes it easy to render a widget on your front end web application. To do so, follow these steps:

1. Go to the file named Main.jsx

2. Scroll to the bottom of the file and look for:

```json
<LeanspaceWidget widgetId=""/ >
```

3. Replace the empty string with an existing widget ID

To get a widget ID, you can search for it within Leanspace's console interface. Or you can utilize an API get request to find and copy in the ID. The choice is yours.

To get the Widget Identifier via the Leanspace console

1. Login to your Leanspace console <br><br>

2. At the top of the page click on Services, then Dashboards<br><br>

3. On the Dashboard page, click on widgets from the left side panel<br><br>

4. Pick from the list of widgets or search for a specific one. Each of the widgets have their asset name, to make it easier to find<br>

5. At the top of the screen, next to your widget name click the copy sign and then paste that text into your code editor

And voila, the widget is rendered on your webapp!

> Additionally if there are issues with rendering, such as the widget not rendering correctly or at all, it is worth checking if the ID is correct or correctly written. <br> <br> For example the ID needs to be in a string format enclosed by quotations.

## Troubleshooting

### Errors when installing for the first time

**Registry / SDK not found**

```
npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/@leanspace%2fdashboard-sdk - Not found
npm ERR! 404
npm ERR! 404  '@leanspace/dashboard-sdk@1.31.3' is not in this registry.
npm ERR! 404
npm ERR! 404 Note that you can also install from a
npm ERR! 404 tarball, folder, http url, or git url.
```

This error appears to occur if your React files are missing the package-lock.json file. You may need to reinstall/reclone your github repository to resolve this issue.

**Registry / SDK not authorized**

```
npm ERR! 401 Unauthorized - GET https://npm.pkg.github.com/download/@leanspace/dashboard-sdk/1.22.1/18b5841c563e93f0353c9b9fad9608ad24991c446b98513bd26cd7c2a4eba5d2 - unauthenticated: User cannot be authenticated with the token provided.
```

This error is likely due to missing your Leanspace token in the .npmrc file. If you haven’t created this file in your root directory, it will throw this error. Otherwise the token needs to be added correctly. Make sure it is not in a string format, such as enclosed by quotation marks.

**Issue with WebApp 4.6**

In some setups you may receive an error message that your WebApp may be incompatible with WebApp 4.4, which is what the starter kit uses. In latest testing, this can be overcome by creating an .env file in your project’s root directory.

Right click on the react-starter-kit folder from your coding editor and select new file
Name it .env and save it

1. Go into the .env file and add the following line: `SKIP_PREFLIGHT_CHECK=true`
2. Save

**code: 'ERR_OSSL_EVP_UNSUPPORTED'**

If you get an error like this one or similar it means that there's issues with the webpack version. To fix this,
I used the following command in the package.json file. Instead of:
"start": "craco start",
do:
"start": "craco --openssl-legacy-provider start",

Save the package.json file with this change and try to run the server again with "npm start".
