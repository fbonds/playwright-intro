import { test, expect } from '@playwright/test';

const states = ['Washington'];

states.forEach((state) => {
  test(`should search for ${state} and verify at least one .gov result`, async ({ page }) => {
    await page.goto('https://www.google.com');
    
    // Use the specific ID, name, or class for the search input field
    const searchInputSelector = 'textarea[name="q"], textarea#APjFqb, textarea.gLFyf';

    await page.fill(searchInputSelector, state);
    await page.keyboard.press('Enter');
    await page.waitForSelector('#search');

    const results = await page.$$eval('#search .g a', links => 
      links.map(link => (link as HTMLAnchorElement).href)
    );
    const hasGovLink = results.some(link => link.includes('.gov'));

    if (!hasGovLink) {
      console.log(`FAIL: No .gov link found for ${state}`);
    }

    expect(hasGovLink).toBeTruthy();
  });
});
