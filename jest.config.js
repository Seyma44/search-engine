module.exports = {
  extensionsToTreatAsEsm: ['.jsx'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    "^react-leaflet$": "<rootDir>/__mocks__/react-leaflet.js",
    "\\.(png)$": "<rootDir>/__mocks__/fileMock.js"
  },
  globals: {
    "NODE_ENV": "test"
  },
  transformIgnorePatterns: [ "node_modules/(?!(axios|react-leaflet)/)",
  "\\.png\\.[^\\/]+$"],
};
