import { defineConfig, devices } from "@playwright/test";
import path from "node:path";

const dist = path.join(__dirname, '..', 'dist');

export default defineConfig({
    testDir: path.join(__dirname, 'tests'), // <-- aqui
    reporter: [['list'], ['html', { outputFolder: 'playwright-report'}]],
    projects: [
        {
            name:'chromium-with-extension',
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
