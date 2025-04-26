import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false, // shows the browser
    baseURL: 'http://localhost:5173',
  },
});
