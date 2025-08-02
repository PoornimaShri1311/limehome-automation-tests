class PropertyPage {
  constructor(page, context) {
    this.page = page;       // original page
    this.context = context; // browser context to listen for new tab
    this.datePickerButton = '//span[@id="qa_open-datepicker-overlay"]';
  }

  // Click the first listing button and switch to the new tab that opens
  async openFirstListing() {
    this.page.click('#qa_listing-button-0');   
  }

  async openDatePicker() {
    await this.page.click(this.datePickerButton);
  }

  // Select start and end dates (using the example indexes 3 and 5)
  async selectDates() {
    await this.page.click("(//div[@class='ngb-dp-day' and not(contains(@class, 'disabled'))]//span[starts-with(@id, 'qa_calendar-day-')])[3]");
    await this.page.click("(//div[@class='ngb-dp-day' and not(contains(@class, 'disabled'))]//span[starts-with(@id, 'qa_calendar-day-')])[5]");
  }

  async clickBookNow() {
    await this.page.click('//div[contains(text(),"Select")]');
  }

  async clickAddAndReview() {
    await this.page.locator('//button[normalize-space()="Add & review"]').click();
  }

  async clickReserve() {
    await this.page.locator('//*[@id="cart-details"]//button[contains(text(),"Reserve")]').click();
  }
}

module.exports = { PropertyPage };
