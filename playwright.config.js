const config = {
  timeout: 30000,
  retries: 0,
  testDir: './tests',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [['html', { open: 'never' }]],
  projects: [
    {
      name: 'Microsoft Edge',
      use: {
        channel: 'msedge',
      },
    }
  ]
};

module.exports = config;
