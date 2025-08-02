export function getRandomString(prefix = 'Test') {
  return `${prefix}${Math.random().toString(36).substring(2, 6)}`;
}

export function getRandomPhone() {
  return `+4915${Math.floor(10000000 + Math.random() * 89999999)}`;
}

export function getRandomEmail() {
  return `${getRandomString('guest')}@mail.com`;
}

export function getRandomPostalCode() {
  return Math.floor(10000 + Math.random() * 89999).toString();
}

export function generateRandomPassword() {
  return `Pass@${Math.floor(Math.random() * 1000000)}!`;
}
export function getRandomCardDetails() {
  const randomName = getRandomString('User');
  const randomCardNumber = '4' + Math.floor(100000000000000 + Math.random() * 900000000000000);
  const randomCVC = Math.floor(100 + Math.random() * 900).toString();
  const futureMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const futureYear = (new Date().getFullYear() + 2).toString().slice(2); // e.g., '27'
  const expiry = `${futureMonth}/${futureYear}`;
  return { randomName, randomCardNumber, randomCVC, expiry };
}
