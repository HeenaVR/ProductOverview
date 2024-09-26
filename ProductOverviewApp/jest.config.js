module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Transform JS/TS files with babel-jest
  },
  transformIgnorePatterns: [
    // Allow transformation for specific node_modules like @react-native and expo modules
    "node_modules/(?!(@react-native|react-native|expo-font|expo-image|expo-modules-core|@expo/vector-icons)/)",
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect", // For jest-native matchers
  ],
  testEnvironment: "jsdom", // Use jsdom for React Native components
  moduleNameMapper: {
    // Mock specific libraries to avoid issues during tests
    "^expo-image$": "<rootDir>/__mocks__/expo-image.tsx",
    "^expo-modules-core$": "<rootDir>/__mocks__/expo-modules-core.ts",
    "^@expo/vector-icons$": "<rootDir>/__mocks__/@expo/vector-icons.js",
    "^expo-font$": "<rootDir>/__mocks__/expo-font.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS files
    "\\.(gif|jpg|jpeg|png|svg|ttf|woff|woff2)$":
      "<rootDir>/__mocks__/fileMock.js", // Mock media files
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"], // Support these extensions
  globals: {
    __DEV__: true, // Ensure __DEV__ is available in tests if needed
  },
  testPathIgnorePatterns: ["/node_modules/", "/e2e/"], // Ignore e2e tests in Jest unit test runs
};
