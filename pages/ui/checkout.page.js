// import { getRandomString, getRandomEmail, getRandomPhone, getRandomPostalCode, getRandomCardDetails } from '../../utils/helpers.js';

// export class CheckoutPage {
//   constructor(page) {
//     this.page = page;

//     // Guest Info
//     this.firstName = '//input[@id="checkout-guest-info-first-name"]';
//     this.lastName = '#checkout-guest-info-last-name';
//     this.email = '#checkout-guest-info-email';
//     this.phone = '#checkout-guest-info-telephone';
//     this.password = '#checkout-signup-create-password';
//     this.street = '#checkout-guest-info-street-address';
//     this.postalCode = '#checkout-guest-info-postal-code';
//     this.city = '#checkout-guest-info-city';
//     this.country = '//input[@id="checkout-guest-info-country-list"]';
//     this.saveProfile = '[data-testid="qa-checkout-guest-info-save-profile"]';

//     // Navigation
//     this.goToRates = '[data-testid="qa-checkout-go-to-rates"]';
//     this.continueToNext = '[data-testid="qa_continue_to_next_step"]';

//     // Payment
//     this.paymentBtn = '[data-testid="qa-checkout-payment-button-text"]';
//     this.cardHolder = '#card_holder';
//     this.cardNumber = '#encryptedCardNumber';
//     this.cardCVC = '#encryptedSecurityCode';
//     this.cardExpiry = '#encryptedExpiryDate';
//   }

//   async fillGuestDetails() {
//     await this.page.locator(this.firstName).click();
//     await this.page.fill(this.firstName, getRandomString('guest'));
//     await this.page.fill(this.lastName, getRandomString('guestlastname'));
//     await this.page.fill(this.email, getRandomEmail());
//     await this.page.fill(this.phone, getRandomPhone());
//     await this.page.fill(this.password, 'Limehome$1');
//     await this.page.fill(this.street, getRandomString('Street-'));
//     await this.page.fill(this.postalCode, getRandomPostalCode());
//     await this.page.fill(this.city, getRandomString('City-'));
//     await this.page.fill(this.country, 'Germany');
//     await this.page.click(this.saveProfile);
//   }

//   async continueToRates() {
//     await this.page.click(this.goToRates);
//   }

//   async continueToNextStep() {
//     await this.page.click(this.continueToNext);
//   }

//   async makePayment() {
//     const { randomName, randomCardNumber, randomCVC, expiry } = getRandomCardDetails();

//     await this.page.fill(this.cardHolder, randomName);
//     await this.page.fill(this.cardNumber, randomCardNumber);
//     await this.page.fill(this.cardCVC, randomCVC);
//     await this.page.fill(this.cardExpiry, expiry);
//     await this.page.click(this.paymentBtn);
//   }
// }

import { getRandomString, getRandomEmail, getRandomPhone, getRandomPostalCode, getRandomCardDetails } from '../../utils/helpers.js';

export class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Guest Info locators
    this.firstName = page.locator('//input[@id="checkout-guest-info-first-name"]'); // XPath locator
    this.lastName = page.locator('#checkout-guest-info-last-name');                  // CSS locator
    this.email = page.locator('#checkout-guest-info-email');
    this.phone = page.locator('#checkout-guest-info-telephone');
    this.password = page.locator('#checkout-signup-create-password');
    this.street = page.locator('#checkout-guest-info-street-address');
    this.postalCode = page.locator('#checkout-guest-info-postal-code');
    this.city = page.locator('#checkout-guest-info-city');
    this.country = page.locator('//input[@id="checkout-guest-info-country-list"]');
    this.saveProfile = page.locator('[data-testid="qa-checkout-guest-info-save-profile"]');

    // Navigation locators
    this.goToRates = page.locator('[data-testid="qa-checkout-go-to-rates"]');
    this.continueToNext = page.locator('[data-testid="qa_continue_to_next_step"]');

    // Payment locators
    this.paymentBtn = page.locator('[data-testid="qa-checkout-payment-button-text"]');
    this.cardHolder = page.locator('#card_holder');
    this.cardNumber = page.locator('#encryptedCardNumber');
    this.cardCVC = page.locator('#encryptedSecurityCode');
    this.cardExpiry = page.locator('#encryptedExpiryDate');
  }

  async fillGuestDetails() {
    await page.waitForLoadState('networkidle');
    await this.firstName.fill(getRandomString('guest'));
    await this.lastName.fill(getRandomString('guestlastname'));
    await this.email.fill(getRandomEmail());
    await this.phone.fill(getRandomPhone());
    await this.street.fill(getRandomString('Street-'));
    await this.postalCode.fill(getRandomPostalCode());
    await this.city.fill(getRandomString('City-'));
    await this.country.fill('Germany');
  }

  async continueToRates() {
    await this.goToRates.click();
  }

  async continueToNextStep() {
    await this.continueToNext.click();
  }

  async makePayment() {
    const { randomName, randomCardNumber, randomCVC, expiry } = getRandomCardDetails();

    await this.cardHolder.fill(randomName);
    await this.cardNumber.fill(randomCardNumber);
    await this.cardCVC.fill(randomCVC);
    await this.cardExpiry.fill(expiry);
    await this.paymentBtn.click();
  }
}
