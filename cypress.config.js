const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://skempin.github.io/reactjs-tmdb-app/',
    setupNodeEvents(on, config) {
    },
  },
});