const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginLink = page.locator('span', { hasText: 'Log in' });
    this.emailInput = page.locator('//input[@id="ngp-input-0"]');
    this.passwordInput = page.locator('//input[@id="ngp-input-1"]');
    this.loginButton = page.locator('//button[@id="qa_auth-signup-btn"]');
    this.errorMessageLocator =page.locator('[data-testid="qa-auth-form-error"]');
  }

  async navigateToLogin() {
    await this.loginLink.click();
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertInvalidLoginMessage() {
  await expect(this.errorMessageLocator).toBeVisible();
}

}

module.exports = { LoginPage };
