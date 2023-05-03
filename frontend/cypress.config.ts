import { defineConfig } from 'cypress';

declare const require: any;

export default defineConfig({
  e2e: {
    baseUrl: 'https://nr-spar-webapp-test-frontend.apps.silver.devops.gov.bc.ca/',
    viewportWidth: 1280,
    viewportHeight: 720,
    experimentalWebKitSupport: true,
    env: {
      apiUrl: 'https://nrbestapi-test-service-api.apps.silver.devops.gov.bc.ca'
    },
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    }
  }
});
