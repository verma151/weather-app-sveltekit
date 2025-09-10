# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).


## set up .env file for this project using this keys 
WEATHER_API_KEY=b91872c774f877283dc9faf31eed2a15
SECRET_KEY=9f3c4a2b6d7e8f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a

## To view the weather history, please refresh or reload the page. Note: this is not a mobile app for browsing past weather data


## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
