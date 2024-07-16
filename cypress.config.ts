import { defineConfig } from 'cypress'

import envConfig from './src/config.json';

export default defineConfig({
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'src/assets',
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      config.env = {
        ...config.env,
        ...envConfig
      }
      return config;
    },
    baseUrl: 'http://localhost:4203'
  },
})
