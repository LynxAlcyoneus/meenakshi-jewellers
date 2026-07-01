# Meenakshi Jewellers

Meenakshi Jewellers is a polished front-end demo for a luxury jewellery brand that combines a premium storefront experience with a safe awareness-style interaction flow. The project showcases product storytelling, a collaborate-with-us experience, and a simple log-viewing feature for internal review. It is designed as a local demo project that can be tested and extended without needing a full production setup.

## From scratch in VS Code

1. Install Node.js from https://nodejs.org/ if it is not already installed.
2. Open VS Code and open the project folder.
3. Open the integrated terminal in VS Code.
4. Install dependencies:
   - npm install
5. Start the local server:
   - npm start
6. Open the site in your browser at http://localhost:3000.

## How to test changes locally

After making changes in VS Code:

1. Save the edited files.
2. Refresh the browser page at http://localhost:3000.
3. Check the affected feature manually.
4. If you changed the UI, verify that the page renders correctly.
5. If you changed the logs or login flow, test the password prompt and related behavior.
6. If you changed the server logic, check the terminal output and confirm the app is still running.

## Expected result

When everything is working correctly, the website should load locally without errors, the navigation and footer should render properly, the popup interaction should open and close as expected, and the logs flow should work as intended.

## How to update it on GitHub later

When you are ready to publish your changes:

1. Review the modified files in VS Code.
2. Open the Source Control panel.
3. Stage the changes.
4. Type a commit message such as:
   - git commit -m "Describe your change"
5. Push the branch to GitHub:
   - git push origin main

If you prefer the terminal, the equivalent commands are:

- git add .
- git commit -m "Describe your change"
- git push origin main
