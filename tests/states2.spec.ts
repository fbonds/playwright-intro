import { test, expect } from '@playwright/test';

const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

states.forEach((state) => {
  test(`should search for ${state} and verify at least one .gov result`, async ({ page }) => {
    await page.goto('https://www.google.com');

    // Use a complex selector combining multiple stable attributes
    const searchInputSelector = 'textarea[name="q"][title="Search"]';

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
