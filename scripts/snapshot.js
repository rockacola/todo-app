import { mkdirSync } from 'fs';
import { join } from 'path';

import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:3000';

async function clearStorage(page) {
  await page.evaluate(async () => {
    localStorage.clear();
    const dbs = await indexedDB.databases();
    await Promise.all(
      dbs.map(
        ({ name }) =>
          new Promise((resolve) => {
            const req = indexedDB.deleteDatabase(name);
            req.onsuccess = resolve;
            req.onerror = resolve;
            req.onblocked = resolve;
          }),
      ),
    );
  });
}

async function addSampleTodos(page) {
  const TASKS = ['Buy groceries', 'Write unit tests', 'Ship the release'];
  const input = page.locator('input[placeholder="Add a task..."]');
  for (const text of TASKS) {
    await input.fill(text);
    await input.press('Enter');
  }
  await page.waitForSelector('text=Buy groceries');
  await page.locator('[data-part="control"]').first().click();
}

const ROUTES = [
  {
    name: 'home-empty',
    path: '/',
  },
  {
    name: 'home-with-todos',
    path: '/',
    postSetup: addSampleTodos,
  },
];

async function main() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
  const dest = join('snapshots', timestamp);
  mkdirSync(dest, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  // Navigate once to establish a localhost context so localStorage is accessible
  await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

  for (const { name, path, postSetup } of ROUTES) {
    await clearStorage(page);
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'load' });
    if (postSetup) {
      await postSetup(page);
    }
    // Timeout is intentional: SSE routes never reach networkidle
    await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
    await page.evaluate(() => {
      document.querySelector('nextjs-portal')?.style.setProperty('display', 'none');
    });
    // Two-pass resize: use the footer's document bottom as the authoritative height.
    // scrollHeight is unreliable because body { min-height: 100vh } inflates it when
    // the viewport is resized. Measuring footer bottom avoids that, but vh-unit elements
    // shift on the first resize, so we re-measure and resize once more to settle.
    const footerBottom = (p) =>
      p.evaluate(() => {
        const footer = document.querySelector('footer');
        return footer
          ? Math.ceil(footer.getBoundingClientRect().bottom + window.scrollY)
          : document.documentElement.scrollHeight;
      });
    await page.setViewportSize({ width: 1280, height: await footerBottom(page) });
    await page.setViewportSize({ width: 1280, height: await footerBottom(page) });
    await page.screenshot({ path: join(dest, `${name}.png`) });
    console.log(`captured ${name}`);
  }

  await browser.close();
  console.log(`\nSnapshots saved to ${dest}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
