# README

## Running this app

- Before running for the first time, install dependencies using `npm install`
- To start the dev server, run `npm run dev`. The page will be available at [http://localhost:5173/](http://localhost:5173/)
- To run tests, run `npm test`
  - Small "gotcha": Some of the tests are throwing an `act` warning due to Material UI transitions. This seemed too minor to fix in a takehome challenge but is something I would want to address in a live app.
  - To run tests with coverage reporting, run `npm run test-coverage`

## Design decisions

### Third-Party Libraries

- Used [`create-vite`](https://vite.dev/guide/) to scaffold a quick Vite/React app
  - I've worked with React for 6+ years and I find it to be a good development experience, so I was happy to use it for this challenge
  - I only started using Vite a little over a year ago, but I find it to be a far superior development experience than webpack or other slower bundlers
- Installed [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/), as it's a commonly used testing library that allows testing user flows and user behavior. Used `vitest` as the test runner, since it is fast and compatible with Vite.
- Used [`axios`](https://axios-http.com/) for data fetching. In a production app, I might first investigate whether a query library is a better fit (something like react-query or RTKQuery), especially if we need to do any caching, but since this is only calling one API and I'm very familiar with axios, I made the decision to go with the simpler library here
- Used [`Material UI`](https://mui.com/material-ui/getting-started/) for easy components. Ideally I would work with my project's design system, but in the absence of a design system, material UI allows for quickly importing components based on Google's Material Design.
- Used [`React Hook Form`](https://www.react-hook-form.com/) for the search and filter form. For more on this, see "Technical Challenges" section.

### Component Structure

- The page-level code lives in `App.tsx`. Individual components imported by this page live in the `components` folder.
- The page consists of two components:

  - `InputForm` contains the form components. All of the form components are currently in one file, but a good next step would be to separate the text, radio, and select components into shared components, where we would pass the data into the shared component and that component would display the options. The `InputForm` would then look something like this:

  ```jsx
    <form
      onSubmit={handleSubmit(fetchRepositories)}
      className="form-container"
    >
      <TextInputComponent
        name="username"
        labelText="Username or organization"
      />
      <SelectFieldComponent
        name="repository-type"
        options=[{value: "all", displayText: "all"}, {value: "owner", displayText: "owner"}]
        labelText="Repository type"
      />
      <RadioGroupComponent
        name="direction"
        options=[{value: "asc", displayText: "Ascending"}, {value: "desc", displayText: "Descending"}]
        labelText="Direction"
      />
      <Button variant="contained" type="submit">
        Search Repositories
      </Button>
    </form>
  ```

  - `DataTable` contains the data being displayed, and in the future would contain pagination and any frontend filtering or sorting of the table.

- Basic building block components (buttons, tables, etc) are imported from Material UI
- I applied some styling for positioning, but did not focus on design for this assignment. For a production app, I would use design system components to ensure that it matched the branding for the company and fully met a11y requirements.

### Technical Challenges

- One of the biggest challenges I had was setting up vitest correctly. While I've worked with vitest before, there is a lot of configuration needed to get it working correctly, and I ran into some trouble there. This would have been a similar issue with any test runner, so I didn't think the trouble was worth changing the test runner.
- I had initially build the form without a form library and using `formData` to get the data from the submit event. However, as I added additional filtering options, I found this to be unsustainable. The Material UI `Select` component was expecting form state to be controlled outside of the form component, so I would have needed to mix local React state with internal form state and I knew that was not ideal. I decided to use `React Hook Form` because I'm very familiar with it and I knew I could set it up quickly. Installing the library and converting my existing form took less than 15 minutes.

## Next Steps

The next steps I would take with this project can be divided into three categories - technical improvements, design improvements, and new features.

### Technical Improvements

- Overall the code has 85% statement coverage, which is okay but could be better. I would add additional tests (including expanding on the `todo` tests in the input form), including testing that the API call is sending the correct data to github (because the data is being returned from github's server and not our local server, there is no value in attempting to test that).
- I haven't included much error handling - I would want to expand on error handling, including handling both form validation and non-200 responses from GitHub. I would also want to test this error handling.

### Design Improvements

- The current design is desktop-only, but could be adapted to be mobile-friendly by moving the results table to be below the search. A further improvement would be to allow the search form to be collapsible on mobile to reduce scrolling.
- The design could also be improved by adding some color, adjusting components to be better aligned, and by structuring the form in a more user-friendly way.

### New Features

- The first new feature I would want to add is pagination, as I did not get a chance to do that as part of this work
- There are some improvements I want to make to the search form, including:
  - Giving the user the ability to expand/collapse the filter options
  - Making the entire form collapsible once data has been fetched, to allow the table to take up the full screen
- I would also want to make some updates to the table, including:
  - Displaying more information, such as creation date or last update
  - Giving the user the ability to sort by any column on the frontend
  - Giving the user the ability to filter the table on the frontend (this would not make an API call, but would temporarily hide certain rows from the table)

## Thank you!

Thank for for taking the time to read through this README and the code! I appreciate your time and effort.

Sarah
