# README

## Running this app - EXPAND

- `npm run dev`

## Design decisions - CLEAN UP + ADD LINKS TO LIBRARIES

### Third-Party Libraries

- Used `create-vite` to scaffold a quick Vite/React app
  - React because required by the challenge (and I'm used to it)
  - Vite because it's fast development experience (and I'm used to it)
- Installed `react-testing-library`, as it's a commonly used testing library that allows testing user flows and user behavior. Used `vitest` as the test runner, since it is fast and compatible with Vite
- Used `axios` for data fetching. In an ideal world, I might first investigate whether a query library is a better fit, especially if we need to do any caching, but since this is only calling one API and I'm very familiar with axios, I made the decision to go with the simpler library here

MATERIAL UI

[- Used `React Hook Form` for the form and validation. It's a library I've worked with extensively and while this is a fairly simple form (and could easily have been done with React), I find RHF to be useful for controlled inputs]

### Component Structure

TODO

## Next Steps - ADD (future features)

## Time Log

- 10/29: 15 minutes - setup and planning
- 10/29:

## DELETE LATER - SLK TO-DO

- Create a form (RHF?)
  - Inputs: username/org
  - LATER: Style inputs/shared components
- Allow form submission
- On submit, call github api
- Display repository list
- Pagination
- Sorting & Filtering
- Tests:
  - Input appears on screen
  - Submit calls the api and returns a response (msw feels like overkill here but maybe if I have time)
  - Pagination calls the api again
  - Sort and filter
- Readme

## Template Instructions - Delete me later

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
