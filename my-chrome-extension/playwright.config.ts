import { defineConfig, devices } from "@playwright/test";
import path from "node:path";

const dist = path.join(__dirname, 'dist');

export default defineConfig({
  testDir: path.join(__dirname, 'tests'),
  timeout: 120000, // aumenta timeout para evitar falha em CI lento
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    headless: false, // headless precisa ser false com extensão
    launchOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage'
      ]
    }
  },
  projects: [
    {
      name: 'chromium-with-extension',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            `--disable-extensions-except=${dist}`,
            `--load-extension=${dist}`
          ]
        }
      }
    }
  ]
});
