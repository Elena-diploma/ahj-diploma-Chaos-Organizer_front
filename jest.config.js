const config = {
  verbose: true,
  rootDir: 'src',
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
};

module.exports = config;
