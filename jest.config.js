module.exports = {
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)" // Sadece axios'u transpile et
  ],
  testEnvironment: 'jsdom', // React için gerekli
};

module.exports = {
  testEnvironment: 'jsdom',
};