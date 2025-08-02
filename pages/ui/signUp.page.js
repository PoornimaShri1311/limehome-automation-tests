const { baseURL, signUpSuitePath } = require('../../config');
const { expect } = require('@playwright/test');

class SignUpPage {
  constructor(page) {
    
    this.page = page;
    this.accountLink ='[data-testid="qa-account-icon-link"]';
    this.signUpLink = '//a[@id="qa_account-signup--desktop"]'; 
    this.emailInput = page.locator('//input[@id="ngp-input-0"]');
    this.passwordInput = page.locator('//input[@id="ngp-input-1"]');
    this.termsConditions ='//span[@id="ngp-checkbox-0"]';
    this.submitButton = '//button[@id="qa_auth-signup-btn"]';
    this.successMessage = '//p[contains(., "Your account is created and we have sent you an email")]';
    this.continueButton = '//button[normalize-space()="Continue"]';
  }

  async gotoSignUp() {
    await this.page.goto(`${baseURL}${signUpSuitePath}`);
  }

  async selectAccount(){
    await this.page.click(this.accountLink);
  }

  async selectSignUp(){
    await this.page.click(this.signUpLink);
  }

 async fillSignUpForm(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submitSignUp() {
    await this.page.click(this.termsConditions);
    await this.page.click(this.submitButton);
  }

  async assertSignUpSuccess() {
    await expect(this.page.locator(this.successMessage)).toBeVisible();
  }

  async clickContinue() {
    await this.page.click(this.continueButton);
  }
}

module.exports = { SignUpPage };
