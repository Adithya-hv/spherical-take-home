import { test, expect } from '@playwright/test';

test('Add a comment and interact with map markers', async ({ page }) => {
  // Navigate to the app
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(3000); // Wait for the page to load

  // TODO: Dont hardcode the the click position
  // Click on the Map Region
  const mapRegion = page.getByRole('region', { name: 'Map' });
  await mapRegion.click({
    position: { x: 424, y: 456 }
  });
  await expect(mapRegion).toBeVisible();

  // Click on the comment textbox and write a comment
  const commentTextbox = page.getByRole('textbox', { name: 'Write your comment here!' });
  await commentTextbox.click();
  await commentTextbox.fill('This is a test');
  await expect(commentTextbox).toHaveValue('This is a test');

  // Submit the comment form
  const submitButton = page.locator('#comment-form').getByRole('button');
  await submitButton.click();
  await expect(submitButton).not.toBeVisible();

  // Click on the 5th map marker and validate the comment
  const marker5 = page.getByRole('img', { name: 'Map marker' }).nth(4);
  await marker5.click();
  const comment = page.getByText('This is a test');
  await expect(comment).toBeVisible();

  // Click on close icon and validate its visibility
  const closeIcon = page.locator('svg').first();
  await closeIcon.click();
  await expect(closeIcon).not.toBeVisible();

  // Click on the 3rd map marker and interact with closeIcon
  const marker3 = page.getByRole('img', { name: 'Map marker' }).nth(2);
  await marker3.click();
  await closeIcon.click();
  await expect(closeIcon).not.toBeVisible();

  // Click the 3rd map marker again and interact with voice icon
  await marker3.click();
  const voiceIcon = page.locator('path').nth(1);
  await voiceIcon.click();
  await expect(voiceIcon).toBeVisible(); // Ensure path element is clickable
});
