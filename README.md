# Simple assessment reporting system


## File structure
Controllers: Get request from route and send http response.
Data: JSON data files. It may be replaced with Models (as required by Sequelize or other ORM)
Middleware: e.g. authentication, logging, error handling.
Routes: Routes by resource type.
Services: Business logic.
Utils: Utilities and helpers. Shared logic.

## Suggested enhancements
- Add pagination to resources
- Move error messages to constants and use a middleware
- Evaluate the dependencies for vulnerabilities as part of the deployment pipeline.

## Snyk Advisor
- [express](https://snyk.io/advisor/npm-package/express)
- [inquirer](https://snyk.io/advisor/npm-package/inquirer)
- [nodemon](https://snyk.io/advisor/npm-package/nodemon)
- [eslint](https://snyk.io/advisor/npm-package/eslint)