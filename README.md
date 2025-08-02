## Limehome challenge - QA Engineer

We appreciate your time and effort in completing the task. We believe that this task will give you an opportunity to showcase your abilities and and will help us to gain a better understanding of your approach to testing.

We understand that your time is valuable, so we kindly request that you do not spend more than 3-4 hours on the challenge.

## Testing Challenge / Front End

Your task is to design and implement some scenarios for Search, Shopping (Add to cart and checkout) through product stories on https://www.limehome.com/suites?property=129&guests=1&rooms=1. Please describe a basic test strategy and implement test scenarios. Implement 3-5 test cases with the highest priority from your point of view. 
You should provide a detailed test report, including the test cases executed, test results, and any issues encountered during the testing process.

## Testing Challenge / Back End
Your task is to write a test suite for the API endpoint https://api.limehome.com/properties/v1/public/properties/129.

- Write a test case to verify that the API endpoint returns a 200 OK response status code. If the response status code is anything other than 200, the test should  fail.
- Write a test case to verify that the API endpoint returns the expected response body. The response body should contain details about the Limehome property with ID 129, including the property name, description, location, and other relevant details.

## What we check:
- Test coverage: Have you designed sufficient number of test cases to cover various scenarios?
- Test script quality: Is the automation script well-organized, easy to understand, and maintainable?
- Documentation: Did you document how to run your tests well? Is your written communication clear and easy-to-understand?

We expect you to send us a link to your code on Gitlab or Github.

### Technology:
We strongly recommend Playwright, but you can use any testing methodology or tool that you prefer.

If you have any questions or feedback about the challenge, don't hesitate to reach out to us!

Good luck with the challenge! We are looking forward to your solution!


✅ Limehome API & UI Automation Tests
This project contains automated Playwright tests to validate both public Limehome property API endpoints and UI flows like sign-up. It uses a modular Page Object Model structure and separates API logic, test data, utilities, and test specs for scalability.

✅ 1. Project Purpose
Automated end-to-end test framework built with Playwright to validate:

Frontend functionality (UI interactions)

Backend API response structure, correctness, and performance

Modularized code using Page Object Model and reusable utility helpers

✅ 2. Installation & Setup
📦 Setup Instructions
Clone the repository:
git clone <your-fork-url>

Install dependencies:
npm init -y
npm install
npx playwright install

✅ 3. Test Coverage Description
🧪 Current Coverage

✅ API Test Scenarios
Valid API request returns 200 OK

Verifies required fields: id, name, location, description

Checks response format is JSON

Ensures response does not include sensitive data (token, apiKey, etc.)

Error handling:

Invalid or missing property ID

Malformed endpoint

Unsupported HTTP methods

Performance: Ensures response is under 1000ms

✅ UI Test Scenarios
Navigating to sign-up page

Selecting account type and filling the form

Submitting the form with random test data

Asserting correct behavior (e.g., success message or error handling)

✅ 4. Directory Structure
QA-Automation-Engineer-Challenge
├── config.js                 # Global configuration (e.g., base URLs)
├── testData/                # Static or dynamic test data
│   └── apiPropertyDetails.json
│   └── uiTestData.json
├── pages/                   # Page Object Model (POM) structure
│   ├── ui/                  # UI Page Objects
│   │   └── checkout.page.js
│   │   └── home.page.js
│   │   └── login.page.js
│   │   └── property.page.js
│   │   └── signUp.page.js
│   └── api/                 # API helper modules
│       └── property.api.js
├── tests/                   # Test specifications
│   ├── UI/
│   │   └── searchBookingCheckout.spec.js
│   └── API/
│       └── property.api.spec.js
├── utils/                   # Shared utility functions
│   └── helpers.js           # For dynamic email/username generation
├── playwright.config.js     # Playwright configuration
├── package.json             # Project metadata and dependencies
└── README.md                # Test documentation (this file)

✅ 5. Utilities
Utilities like random email or username generation are located in:
utils/helpers.js

Usage example:
const { getRandomEmail } = require('../utils/dataGenerator');

✅ 6. Configuration
The file config.js holds environment-specific values such as:
module.exports = {
  baseUrl: 'https://www.limehome.com',
};
You can import and use it in test files or POMs.

✅ 7. Run Specific Tests
npx playwright test tests/API/property.api.spec.js                # Run only API tests
npx playwright test tests/UI/searchBookingCheckout.spec.js        # Run only UI tests

Run tests:
npx playwright test

(Optional: Run in headed mode)
npx playwright test --headed

Open Report:
npx playwright show-report


## 🔮 Future Plans & Enhancements

### ✅ 1. **Add CI/CD Integration**

* **Why**: Automate test runs on every code push or pull request.
* **Tools**: GitHub Actions, GitLab CI, Jenkins, Bitbucket Pipelines.
* **What to implement**:

  * Trigger on push to `main`/`develop`
  * Run both UI & API tests
  * Generate test reports and artifacts (e.g., HTML reports)

---

### ✅ 2. **Multi-Environment Support**

* **Why**: Run tests across `dev`, `staging`, `production` with minimal config changes.
* **How**:

  * Add `config.dev.js`, `config.stage.js`, etc.
  * Use ENV variables like `process.env.ENV`

```bash
ENV=staging npx playwright test
```

---

### ✅ 3. **Test Data Management Improvements**

* Centralize and externalize dynamic data
* Use `.env` or `YAML/JSON` files with faker.js or data-faker-utils
* Integrate data pools for different user roles or permissions


### ✅ 4. **Reporting & Dashboard**

* Use tools like:

  * `Allure` for beautiful reports
  * `HTML reporter` (Playwright built-in)
  * `Slack/Email` alerts for failed runs

### ✅ 5. **Cross-Browser Testing**

* Currently likely runs on Chromium; extend to:

  * Firefox
  * WebKit
* Enable Playwright config:

```js
projects: [
  { name: 'Chromium', use: { browserName: 'chromium' } },
  { name: 'Firefox', use: { browserName: 'firefox' } },
  { name: 'WebKit', use: { browserName: 'webkit' } }
]

### ✅ 6. **Scalability: Modularize Further**

* Create base classes for common logic in API & UI
* Split utils: `apiUtils`, `uiUtils`, `assertionUtils`
* Prepare the framework for multi-user, multi-role, multi-flow testing
