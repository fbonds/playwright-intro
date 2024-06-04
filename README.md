Learning Playwright for TTA Hub opportunity.

Created two spec.ts files in /tests folder

states.google.spec.ts: First one I created.  Simple search of first page results for at least one .gov TLD for all US states.  All of these should pass, but occasionaly one to a few do not.  It seems to be a timing issue.

react.todomvc.spec.ts: 2nd one I created.  Tried to do more of an end to end test using the todo list sample for react at todomvc.com.

In both cases I came up with test idea on my own and largely wrote them myself.  Relying only on generative AI for syntax and debugging.  

To run:
1. Clone repo
2. Install packages 'npm install'
3. run tests: 'npx playwright test filename.spec.ts'
4. Alternately use playwright gui to run tests: 'npx playwright test --ui', navigate to each test and play. (allows you to view browser during steps of test)
