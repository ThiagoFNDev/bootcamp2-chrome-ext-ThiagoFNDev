import { defineConfig, devices } from "@playwright/test";
import path from "node:path";

// Caminho da pasta da extensão (ajuste se necessário)
const dist = path.join(__dirname, 'dist'); // se o config.ts está em my-chrome-extension, ok
// const dist = path.join(__dirname, 'my-chrome-extension/dist'); // se o config.ts estiver fora da pasta

export default defineConfig({
  testDir: path.join(__dirname, 'tests'), // pasta dos testes
  timeout: 180000, // 3 minutos por teste
  expect: { timeout: 10000 }, // espera máxima para asserts
  reporter: [
    ['list'], 
    ['html', { outputFolder: 'playwright-report' }]
  ],
  use: {
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 0,
    baseURL: 'https://google.com', // exemplo
  },
  projects: [
    {
      name: 'chromium-with-extension',
      use: {
        ...devices['Desktop Chrome'],
        headless: true, // CI precisa estar headless
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
