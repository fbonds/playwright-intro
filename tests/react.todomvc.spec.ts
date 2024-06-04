// import functions necessary to do the testing
import { test, expect } from '@playwright/test';

test(`should confirm todomvc's react example page can be reached`, async ({ page }) => {
    const response = await page.goto('https://todomvc.com/examples/react/dist/#/');
    expect(response?.ok()).toBeTruthy();

    const searchField = await page.waitForSelector('input.new-todo[data-testid="text-input"]');
    expect(searchField).not.toBeNull();
});