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
- Used `Material UI` for easy components. Ideally I would work with my project's design system, but material UI allows for quickly importing components based on Google's Material Design

### Component Structure

- The page-level code lives in `App.tsx`. Individual components imported by this page live in the `components` folder.
- I decided to separate the input form into its own component, even though it is very small, because it is its own distinct unit. Form state is managed inside the form, and a state-setter function is passed as a prop to allow the API response to update the data in the parent component.
- Basic building block components (buttons, tables, etc) are imported from Material UI

## Next Steps - ADD (future features)

## Time Log

- 10/29: 15 minutes - setup and planning
- 10/29: 50 minutes work

## DELETE LATER - SLK TO-DO

NEXT: Tests for input form

- Create a form :white_check_mark:
  - Inputs: username/org :white_check_mark:
  - LATER: Style inputs/shared components :white_check_mark:
- Allow form submission :white_check_mark:
- On submit, call github api :white_check_mark:
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
