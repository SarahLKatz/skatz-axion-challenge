# README

## Running this app - EXPAND

- Before running for the first time, install dependencies using `npm install`
- To start the dev server, run `npm run dev`. The page will be available at [http://localhost:5173/](http://localhost:5173/)
- To run tests, run `npm test`
  - Small "gotcha": Some of the tests are throwing an `act` warning due to Material UI transitions. This seemed too minor to fix in a takehome challenge but is something I would want to address in a live app.

## Design decisions - CLEAN UP + ADD LINKS TO LIBRARIES

### Third-Party Libraries

- Used `create-vite` to scaffold a quick Vite/React app
  - React because required by the challenge (and I'm used to it)
  - Vite because it's fast development experience (and I'm used to it)
- Installed `react-testing-library`, as it's a commonly used testing library that allows testing user flows and user behavior. Used `vitest` as the test runner, since it is fast and compatible with Vite.
- Used `axios` for data fetching. In an ideal world, I might first investigate whether a query library is a better fit, especially if we need to do any caching, but since this is only calling one API and I'm very familiar with axios, I made the decision to go with the simpler library here
- Used `Material UI` for easy components. Ideally I would work with my project's design system, but in the absence of a design system, material UI allows for quickly importing components based on Google's Material Design.

### Component Structure

- The page-level code lives in `App.tsx`. Individual components imported by this page live in the `components` folder.
- FORM INFO!
- Basic building block components (buttons, tables, etc) are imported from Material UI

### Technical Challenges

- One of the biggest challenges I had was setting up vitest correctly. While I've worked with vitest before, there is a lot of configuration needed to get it working correctly, and I ran into some trouble there. This would have been a similar issue with any test runner, so I didn't think the trouble was worth changing the test runner.
- FORM LIBRARY

## Next Steps - ADD (future features)

- ADDITIONAL TESTS (SEE)
- BETTER STYLING

## Time Log

- 10/29: 15 minutes - setup and planning
- 10/29: 50 minutes work
- 10/30: 55 minutes work
- 10/31: 75 minutes work

## DELETE LATER - SLK TO-DO

NEXT: Hoist filters to parent, pagination, fix readme

- Create a form :white_check_mark:
  - Inputs: username/org :white_check_mark:
  - LATER: Style inputs/shared components :white_check_mark:
- Allow form submission :white_check_mark:
- On submit, call github api :white_check_mark:
- Display repository list :white_check_mark:
- Pagination
- Sorting & Filtering
- Tests:
  - Input appears on screen :white_check_mark:
  - Submit calls the api and returns a response :white_check_mark:
  - Pagination calls the api again
  - Sort and filter
  - Display repos :white_check_mark:
- Readme
