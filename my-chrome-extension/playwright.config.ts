import { defineConfig, devices } from "@playwright/test";
import path from "node:path";

const dist = path.join(__dirname, 'dist'); // ou '..', dependendo da localização do dist

export default defineConfig({
  testDir: path.join(__dirname, 'tests'), // <-- aqui deve apontar para a pasta de testes
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  projects: [
    {
      name: 'chromium-with-extension',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        launchOptions: {
          args: [
            `--disable-extensions-except=${dist}`,
            `--load-extension=${dist}`
          ]
        }
      }
    }
  ]
});
