const testData = require('../../testData/apiPropertyDetails.json');

class PropertyAPI {
  constructor(request) {
    this.request = request;
    this.apiBaseUrl = 'https://api.limehome.com/properties/v1/public/properties';
  }

  getPropertyUrl(id) {
    return `${this.apiBaseUrl}/${id}`;
  }

  async validatePropertyDetails(payload, expectedId = testData.validPropertyId, expect) {
    expect(payload).toBeDefined();
    expect(payload.id).toBe(expectedId);
    expect(payload.name).toBe(testData.propertyDetails.name);
    expect(payload.description).toContain(testData.propertyDetails.descriptionContains);
    expect(payload.location.city.toLowerCase()).toBe(testData.propertyDetails.location.city);
    expect(payload.location.countryCode).toBe(testData.propertyDetails.location.countryCode);
    expect(payload.location.postalCode).toBe(testData.propertyDetails.location.postalCode);
  }
}

module.exports = { PropertyAPI };