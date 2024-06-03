// import functions necessary to do the testing
import { test, expect } from '@playwright/test';

// define array of all 50 states 
const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

// iterate over each state, performing a google search on the states name and confirming that the first page of results contain at least 
// one href target to a .gov TLD
states.forEach((state) => {
  test(`should search for ${state} and verify at least one .gov result`, async ({ page }) => {
    await page.goto('https://www.google.com');

    // needed to add complexity to the selector by including both name and title.  name 'g' from google search examples on it's own
    // was failing to find search field
    const searchInputSelector = 'textarea[name="q"][title="Search"]';

    // perform search
    await page.fill(searchInputSelector, state);
    await page.keyboard.press('Enter');
    await page.waitForSelector('#search');

    // use playwright's $$eval method to grab all the href targets in the results list of the page
    const results = await page.$$eval('#search .g a', links => 
      links.map(link => (link as HTMLAnchorElement).href)
    );
    // set up hasGovLink true if some link in the array created in previous step contains .gov
    const hasGovLink = results.some(link => link.includes('.gov'));

    // log error for failures to console
    if (!hasGovLink) {
      console.log(`FAIL: No .gov link found for ${state}`);
    }
    // test if hasGovLink is true
    expect(hasGovLink).toBeTruthy();
  });
});
