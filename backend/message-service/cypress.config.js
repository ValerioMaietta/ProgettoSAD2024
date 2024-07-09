import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8000',
    setupNodeEvents(on, config) {
      // Puoi aggiungere ascoltatori di eventi qui, ad esempio:
     
      // Puoi aggiungere altre configurazioni o plugin qui
    },
    specPattern: 'cypress/integrations/*.spec.js',
    supportFile: 'cypress/support/e2e.js'
  },
  env: {
    apiBaseUrl: 'http://localhost:8000/api/messages'
  },
  fixturesFolder: 'cypress/fixtures'
});
