# Test info

- Name: marker interaction flow
- Location: /Users/adithya/CSProjects/STHTest/client/tests/e2e/app.test.ts:3:1

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('region', { name: 'Map' })
    - locator resolved to <canvas tabindex="0" width="1280" height="720" role="region" aria-label="Map" class="mapboxgl-canvas"></canvas>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-v-ebc1b1ae="" class="popup-floating">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-v-ebc1b1ae="" class="popup-floating">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    22 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div data-v-ebc1b1ae="" class="popup-floating">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms

    at /Users/adithya/CSProjects/STHTest/client/tests/e2e/app.test.ts:28:51
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('marker interaction flow', async ({ page }) => {
   4 |   // Audio spy
   5 |   await page.addInitScript(() => {
   6 |     window.__audioPlayed = false;
   7 |     const originalPlay = HTMLAudioElement.prototype.play;
   8 |     HTMLAudioElement.prototype.play = function (...args) {
   9 |       window.__audioPlayed = true;
  10 |       return originalPlay.apply(this, args);
  11 |     };
  12 |   });
  13 |
  14 |   await page.goto('http://localhost:5173/');
  15 |   await page.waitForTimeout(3000); // Wait for animation to finish
  16 |
  17 |   // Minimize comment box
  18 |   // TODO: Clicks on the map should not be hardcoded
  19 |   await page.getByRole('region', { name: 'Map' }).click({ position: { x: 501, y: 453 } });
  20 |   const commentBox = page.getByText('Comment:');
  21 |   if (await commentBox.isVisible()) {
  22 |     await commentBox.click();
  23 |     await page.getByRole('img', { name: 'Minimize' }).click();
  24 |     await expect(commentBox).not.toBeVisible();
  25 |   }
  26 |
  27 |   // Form interaction
> 28 |   await page.getByRole('region', { name: 'Map' }).click({ position: { x: 510, y: 448 } });
     |                                                   ^ Error: locator.click: Target page, context or browser has been closed
  29 |   await page.getByRole('textbox', { name: 'Comment:' }).fill('This is a test.');
  30 |   await page.getByRole('button', { name: 'Add' }).click();
  31 |
  32 |   // Check if marker exists
  33 |   await page.getByRole('img', { name: 'Map marker' }).nth(1).click();
  34 |   await expect(page.getByText('This is a test.')).toBeVisible();
  35 |
  36 |   // Check if marker is minimized
  37 |   await page.getByRole('img', { name: 'Minimize' }).click();
  38 |   await expect(page.getByText('This is a test.')).not.toBeVisible();
  39 |
  40 |   // Check if marker is deleted
  41 |   const markersBefore = await page.getByRole('img', { name: 'Map marker' }).count();
  42 |   await page.getByRole('img', { name: 'Map marker' }).nth(1).click();
  43 |   await page.getByRole('img', { name: 'Delete' }).click();
  44 |   await expect(page.getByRole('img', { name: 'Map marker' })).toHaveCount(markersBefore - 1);
  45 |
  46 |   // Check if voice marker exists
  47 |   await page.getByRole('img', { name: 'Map marker' }).click();
  48 |   await expect(page.getByText('Translation:')).toBeVisible();
  49 |   await page.getByRole('img', { name: 'Minimize' }).click();
  50 |   await expect(page.getByText('Translation:')).not.toBeVisible();
  51 |
  52 |   // Sound play interaction
  53 |   await page.getByRole('img', { name: 'Map marker' }).click();
  54 |   await page.getByRole('img', { name: 'Play Sound' }).click();
  55 |   const played = await page.evaluate(() => (window as any).__audioPlayed);
  56 |   expect(played).toBe(true);
  57 |   await page.getByRole('img', { name: 'Minimize' }).click();
  58 |   await expect(page.getByRole('img', { name: 'Map marker' })).toHaveCount(1);
  59 | });
  60 |
```