// import { getRandomEmail, generateRandomPassword } from '../../utils/helpers.js';
// const { test, expect } = require('@playwright/test');
// const { HomePage } = require('../../pages/ui/home.page.js')
// const { PropertyPage } = require('../../pages/ui/property.page');
// const { CheckoutPage } = require('../../pages/ui/checkout.page');
// const { SignUpPage } = require('../../pages/ui/signUp.page');
// const { LoginPage } = require('../../pages/ui/login.page');

// test('Sign Up', async ({ page }) => {
//   const signUpPage = new SignUpPage(page);
//   const homePage = new HomePage(page);
//   const propertyPage = new PropertyPage(page);
//   const checkoutPage = new CheckoutPage(page);

//   const email = getRandomEmail();
//   const password = generateRandomPassword();

//   await signUpPage.gotoSignUp();
//   await homePage.acceptCookies();
//   await signUpPage.selectAccount();
//   await signUpPage.selectSignUp();
//   await signUpPage.fillSignUpForm(email, password);
//   await signUpPage.submitSignUp();
//   await signUpPage.assertSignUpSuccess();
//   await signUpPage.clickContinue();
// });

// test('Login Failure', async ({ page }) => {
//   const homePage = new HomePage(page);
//   const propertyPage = new PropertyPage(page);
//   const checkoutPage = new CheckoutPage(page);
//   const signUpPage = new SignUpPage(page);
//   const loginPage = new LoginPage(page);

//   await signUpPage.gotoSignUp();
//   await homePage.acceptCookies();
//   await signUpPage.selectAccount();
//   await loginPage.navigateToLogin();
//   await loginPage.login('invalid@gmail.com','LimeHome@123');
//   await loginPage.assertInvalidLoginMessage();
// });

// test('End-to-end booking flow', async ({ page }) => {
//   const homePage = new HomePage(page);
//   const propertyPage = new PropertyPage(page);
//   const checkoutPage = new CheckoutPage(page);
//   const signUpPage = new SignUpPage(page);
//   const loginPage = new LoginPage(page);

//   await signUpPage.gotoSignUp();
//   await homePage.acceptCookies();
//   await signUpPage.selectAccount();
//   await loginPage.navigateToLogin();
//   await loginPage.login('shriga1990@gmail.com','LimeHome@123');

//   await homePage.selectCity('Salzburg');
  
//   // Wait for the new tab (page) to open and assign it
// const [newPage] = await Promise.all([
//   page.context().waitForEvent('page'),
//   propertyPage.openFirstListing(), // This triggers the new tab
// ]);

// // Optional but recommended: wait for the new page to load
// await newPage.waitForLoadState('domcontentloaded'); // Or 'load'

// // Bring new tab to front
// await newPage.bringToFront();

// // Re-initialize PropertyPage for the new tab
// const propertyPageInNewTab = new PropertyPage(newPage);

// // Now it's safe to use methods on the new tab
// await propertyPageInNewTab.openDatePicker();
//   await propertyPageInNewTab.selectDates();
//   await propertyPageInNewTab.clickBookNow();
//   await propertyPageInNewTab.clickAddAndReview();
//   await propertyPageInNewTab.clickReserve();

//   await checkoutPage.fillGuestDetails();
// });

import { getRandomEmail, generateRandomPassword } from '../../utils/helpers.js';
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/ui/home.page.js');
const { PropertyPage } = require('../../pages/ui/property.page');
const { CheckoutPage } = require('../../pages/ui/checkout.page');
const { SignUpPage } = require('../../pages/ui/signUp.page');
const { LoginPage } = require('../../pages/ui/login.page');

const testData = require('../../testData/uiTestData.json');

test('Sign Up', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  const homePage = new HomePage(page);

  // Generate random email and password using helpers
  const email = getRandomEmail();
  const password = generateRandomPassword();

  await signUpPage.gotoSignUp();
  await homePage.acceptCookies();
  await signUpPage.selectAccount();
  await signUpPage.selectSignUp();
  await signUpPage.fillSignUpForm(email, password);
  await signUpPage.submitSignUp();
  await signUpPage.assertSignUpSuccess();
  await signUpPage.clickContinue();
});

test('Login Failure', async ({ page }) => {
  const homePage = new HomePage(page);
  const signUpPage = new SignUpPage(page);
  const loginPage = new LoginPage(page);

  await signUpPage.gotoSignUp();
  await homePage.acceptCookies();
  await signUpPage.selectAccount();
  await loginPage.navigateToLogin();

  await loginPage.login(
    testData.login.invalidUser.email,
    testData.login.invalidUser.password
  );

  await loginPage.assertInvalidLoginMessage();
});

test('End-to-end booking flow', async ({ page }) => {
  const homePage = new HomePage(page);
  const propertyPage = new PropertyPage(page);
  const checkoutPage = new CheckoutPage(page);
  const signUpPage = new SignUpPage(page);
  const loginPage = new LoginPage(page);

  await signUpPage.gotoSignUp();
  await homePage.acceptCookies();
  
  await signUpPage.selectAccount();
  await loginPage.navigateToLogin();

  await loginPage.login(
    testData.login.validUser.email,
    testData.login.validUser.password
  );

  await homePage.selectCity(testData.booking.city);

  // Wait for new tab and assign it
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    propertyPage.openFirstListing(),
  ]);
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.bringToFront();

  // Re-init PropertyPage for new tab
  const propertyPageInNewTab = new PropertyPage(newPage);

  await propertyPageInNewTab.openDatePicker();
  await propertyPageInNewTab.selectDates();
  await propertyPageInNewTab.clickBookNow();
  await propertyPageInNewTab.clickAddAndReview();
  await propertyPageInNewTab.clickReserve();

  await checkoutPage.fillGuestDetails();
  await checkoutPage.continueToRates();
  await checkoutPage.continueToNextStep();
  await checkoutPage.makePayment();
});