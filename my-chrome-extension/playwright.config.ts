import { defineConfig, devices } from "@playwright/test";
import path from "node:path";

const dist = path.join(__dirname, 'dist'); // pasta da extensão

export default defineConfig({
  testDir: path.join(__dirname, 'tests'),
  timeout: 180000, // 3 minutos por teste
  expect: { timeout: 10000 },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  projects: [
    {
      name: 'chromium-with-extension',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-software-rasterizer',
            `--disable-extensions-except=${dist}`,
            `--load-extension=${dist}`
          ]
        }
      }
    }
  ]
});
