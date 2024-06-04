// import functions necessary to do the testing
import { test, expect } from '@playwright/test';

// confirm the react todo list demon on todomvc can be reached
test(`should confirm todomvc's react example page can be reached`, async ({ page }) => {
    const response = await page.goto('https://todomvc.com/examples/react/dist/#/');
    expect(response?.ok()).toBeTruthy();

    const searchField = await page.waitForSelector('input.new-todo[data-testid="text-input"]');
    expect(searchField).not.toBeNull();
});

// prepare a list of todos to be used in the end to end test
const todos = [
    'Research Playwright test automation framework', 
    'Create a variety of ideas', 
    'Implement those ideas', 
    'Confirm funcitonality'
];


// create an end to end test that iteratively:
// Creates todo items (done)
// Confirms each todo items creation creation (done)
// Marks each todo item as complete (don)
// Confirms each item disappears from the active todo list (done)
// and appears on the Completed list (done)
todos.forEach((todo) => {
    test(`should create a list of ${todo} and confirmn they exist`, async ({ page }) => {
        await page.goto('https://todomvc.com/examples/react/dist/#/');

        // define precise selector - try to avoid flakiness
        const inputSelector = 'input.new-todo[data-testid="text-input"]';
        
        // fill out the list
        await page.fill(inputSelector, todo);
        await page.keyboard.press('Enter');
        await page.waitForSelector('#todo-input.new-todo');


        // Check if the new item exists in the list
        const newItemExists = await page.$$eval('[data-testid="todo-item-label"]', (items, todoText) => {
            return items.some((item) => item.textContent === todoText);
        }, todo);
        expect(newItemExists).toBeTruthy();

        // Navigate to Active view
        await page.click('a[href="#/active"]');

        // Mark todo item as completed & verify
        const checkboxSelector = `input[type="checkbox"][data-testid="todo-item-toggle"]`;
        await page.click(checkboxSelector);
        const isNoLongerInActive = await page.$$eval('[data-testid="todo-item-label"]', (items, todoText) => {
            return !items.some((item) => item.textContent === todoText);
        }, todo);
        expect(isNoLongerInActive).toBeTruthy();

        // Navigate to completed view
        await page.click('a[href="#/completed"]');

        // Verify item now appears on completed list
        const isInCompleted = await page.$$eval('[data-testid="todo-item-label"]', (items, todoText) => {
            return items.some((item) => item.textContent === todoText);
        
        }, todo);
        expect(isInCompleted).toBeTruthy();

    });
});
