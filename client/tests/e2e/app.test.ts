import { test, expect } from '@playwright/test';

test('marker interaction flow', async ({ page }) => {
  // Audio spy
  await page.addInitScript(() => {
    window.__audioPlayed = false;
    const originalPlay = HTMLAudioElement.prototype.play;
    HTMLAudioElement.prototype.play = function (...args) {
      window.__audioPlayed = true;
      return originalPlay.apply(this, args);
    };
  });

  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(3000); // Wait for animation to finish

  // Minimize comment box
  // TODO: Clicks on the map should not be hardcoded
  await page.getByRole('region', { name: 'Map' }).click({ position: { x: 501, y: 453 } });
  const commentBox = page.getByText('Comment:');
  if (await commentBox.isVisible()) {
    await commentBox.click();
    await page.getByRole('img', { name: 'Minimize' }).click();
    await expect(commentBox).not.toBeVisible();
  }

  // Form interaction
  await page.getByRole('region', { name: 'Map' }).click({ position: { x: 510, y: 448 } });
  await page.getByRole('textbox', { name: 'Comment:' }).fill('This is a test.');
  await page.getByRole('button', { name: 'Add' }).click();

  // Check if marker exists
  await page.getByRole('img', { name: 'Map marker' }).nth(1).click();
  await expect(page.getByText('This is a test.')).toBeVisible();

  // Check if marker is minimized
  await page.getByRole('img', { name: 'Minimize' }).click();
  await expect(page.getByText('This is a test.')).not.toBeVisible();

  // Check if marker is deleted
  const markersBefore = await page.getByRole('img', { name: 'Map marker' }).count();
  await page.getByRole('img', { name: 'Map marker' }).nth(1).click();
  await page.getByRole('img', { name: 'Delete' }).click();
  await expect(page.getByRole('img', { name: 'Map marker' })).toHaveCount(markersBefore - 1);

  // Check if voice marker exists
  await page.getByRole('img', { name: 'Map marker' }).click();
  await expect(page.getByText('Translation:')).toBeVisible();
  await page.getByRole('img', { name: 'Minimize' }).click();
  await expect(page.getByText('Translation:')).not.toBeVisible();

  // Sound play interaction
  await page.getByRole('img', { name: 'Map marker' }).click();
  await page.getByRole('img', { name: 'Play Sound' }).click();
  const played = await page.evaluate(() => (window as any).__audioPlayed);
  expect(played).toBe(true);
  await page.getByRole('img', { name: 'Minimize' }).click();
  await expect(page.getByRole('img', { name: 'Map marker' })).toHaveCount(1);
});
