module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native)/)", // Allow transformation of specific node_modules
  ],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
};
