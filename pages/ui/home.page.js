class HomePage {
  constructor(page) {
    this.page = page;
    this.cookieButton = '[data-testid="uc-deny-all-button"]';
    this.cityPickerInput = page.locator('#qa_city-picker-name');
    this.searchInput = page.locator('#search');
    this.cityOptionSalzburg = page.locator('#qa_city-salzburg');
    this.firstListingButton = page.locator('#qa_listing-button-0');
  }

  async acceptCookies() {
    await this.page.click(this.cookieButton);
  }

  async selectCity(cityName = 'Salzburg') {
    await this.cityPickerInput.click();
    await this.searchInput.fill(cityName);
    if (cityName.toLowerCase() === 'salzburg') {
      await this.cityOptionSalzburg.click();
    } else {
      
    }
  }
}

module.exports = { HomePage };
