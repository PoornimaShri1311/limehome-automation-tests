const { test, expect } = require('@playwright/test');
const { PropertyAPI } = require('../../pages/api/property.api');
const testData = require('../../testData/apiPropertyDetails.json');

test.describe('Limehome Property API Tests', () => {
  let api;

  test.beforeEach(async ({ request }) => {
    api = new PropertyAPI(request);
  });

  test('should return 200 OK and correct property details', async () => {
    const response = await api.request.get(api.getPropertyUrl(testData.validPropertyId));
    expect(response.status()).toBe(200);

    const json = await response.json();
    await api.validatePropertyDetails(json.payload, testData.validPropertyId, expect);
  });

  test('should return content-type application/json', async () => {
    const response = await api.request.get(api.getPropertyUrl(testData.validPropertyId));
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('should contain all required keys in payload', async () => {
    const response = await api.request.get(api.getPropertyUrl(testData.validPropertyId));
    const payload = (await response.json()).payload;

    expect(payload).toHaveProperty('id');
    expect(payload).toHaveProperty('name');
    expect(payload).toHaveProperty('description');
    expect(payload).toHaveProperty('location');
    expect(payload.location).toHaveProperty('lat');
    expect(payload.location).toHaveProperty('lng');
    expect(payload.location).toHaveProperty('city');
  });

  test('should not expose sensitive fields', async () => {
    const response = await api.request.get(api.getPropertyUrl(testData.validPropertyId));
    const keys = Object.keys((await response.json()).payload);

    testData.forbiddenFields.forEach(field => {
      expect(keys).not.toContain(field);
    });
  });

  test('should respond within 1000ms', async () => {
    const start = Date.now();
    await api.request.get(api.getPropertyUrl(testData.validPropertyId));
    const duration = Date.now() - start;

    console.log(`Response time: ${duration} ms`);
    expect(duration).toBeLessThan(1000);
  });

  test('should return 404 for non-existent property ID', async () => {
    const invalidId = testData.invalidPropertyId;
    const response = await api.request.get(api.getPropertyUrl(invalidId));
    expect(response.status()).toBe(404); // Adjust based on actual API behavior

    const data = await response.json();
    expect(data.success).toBeFalsy();
  });

  test('should return appropriate error for unsupported POST method', async () => {
    const response = await api.request.post(api.getPropertyUrl(testData.validPropertyId));
    expect(response.status()).not.toBe(200);

    const contentType = response.headers()['content-type'];
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      expect(data.success).toBeFalsy();
    } else {
      const text = await response.text();
      console.log('Non-JSON error:', text);
    }
  });
});
