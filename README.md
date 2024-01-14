# Simple assessment reporting system

This is an interactive CLI that generates assessment reports based on historical data files.

There are three types of report:
- A *diagnostic* report which tells the student where they might have areas of weakness
- A *progress* report which tells the student how much they have improved over the year
- A *feedback* report providing information about where a student went wrong on individual questions and offers hints 
on how to answer these questions correctly.

## How to get started

1. Navigate to the root directory of this project.
2. Install all the dependencies: `npm i`
3. Run the server: `npm run server`
4. In a separate tab, run the application: `npm run app`

- To run in development mode: `npm run start:dev`
- To run in development with debug mode: `npm run start:debug`
- To run Unit Tests: `npm run test`
- To evaluate the code for Lint rules: `npm run lint`

## File structure
- Controllers: Get request from route and send http response.
- Data: JSON data files. It may be replaced with Models (as required by Sequelize or other ORM)
- Middleware: e.g. authentication, logging, error handling.
- Routes: Routes by resource type.
- Services: Business logic.
- Utils: Utilities and helpers. Shared logic.

## Suggested enhancements
- Enforce authentication to access the data via middleware.
- Enforce SSL for Production.
- Add pagination to resources.
- Move error messages to constants and use a middleware for error handling.
- Handle logs via middleware.
- Evaluate the dependencies for vulnerabilities as part of the deployment pipeline.
- Sanitise/validate User input.
- Accessibility
- CLI best practices
- Change structure for a more clear separation of concerns: API vs Web/App

### Useful articles
- [Command-Line Interfaces: Structure & Syntax](https://dev.to/paulasantamaria/command-line-interfaces-structure-syntax-2533)
- [7 Best Approach of Protecting Routes in Node.js Every Senior Engineer Suggests](https://medium.com/@vikramgyawali57/7-best-approach-of-protecting-routes-in-node-js-every-senior-engineer-suggests-fc32b7777827)

## Snyk Advisor
- [express](https://snyk.io/advisor/npm-package/express)
- [inquirer](https://snyk.io/advisor/npm-package/inquirer)
- [nodemon](https://snyk.io/advisor/npm-package/nodemon)
- [eslint](https://snyk.io/advisor/npm-package/eslint)
- [eslint-plugin-jest](https://snyk.io/advisor/npm-package/eslint-plugin-jest)
- [body-parser](https://snyk.io/advisor/npm-package/body-parser)
- [jest](https://snyk.io/advisor/npm-package/jest)
- [msw](https://snyk.io/advisor/npm-package/msw)
- [supertest](https://snyk.io/advisor/npm-package/supertest)