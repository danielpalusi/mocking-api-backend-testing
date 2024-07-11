// cypress.config.js
export default {
  e2e: {
    baseUrl: "https://mocking-api-da4e905b3a6f.herokuapp.com",
    setupNodeEvents(on, config) {},
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
};
