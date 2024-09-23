module.exports = {
  env: {
    node: true, // define the Node.js environment
  },
  parser: "@typescript-eslint/parser", // Allows ESLint to parse TypeScript
  plugins: [
    "@typescript-eslint", // Lint TypeScript code
    "react", // Lint React code
    "react-hooks", // Lint React hooks
    "react-native", // Lint React Native-specific code
  ],
  extends: [
    "eslint:recommended", // Use ESLint's recommended rules
    "plugin:@typescript-eslint/recommended", // Use TypeScript-specific recommended rules
    "plugin:react/recommended", // Use React-specific recommended rules
    "plugin:react-hooks/recommended", // React Hooks linting rules
    "plugin:react-native/all", // Use all React Native rules
  ],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }], // Only allow JSX in .tsx files
    "@typescript-eslint/no-unused-vars": ["error"], // Catch unused variables
    "@typescript-eslint/explicit-module-boundary-types": "off", // Don't require return types for every function
    "react/react-in-jsx-scope": "off", // No need to import React (for React 17+)
    "react-native/no-inline-styles": "warn", // Warn against using inline styles in React Native
    "react-native/no-unused-styles": "error", // Error for unused styles in React Native
    "react-native/split-platform-components": "warn", // Warn if platform-specific components aren't split correctly
    "react-native/sort-styles": "off", // Disable sort-styles rule
    "react/prop-types": "off", // Disable prop-types validation for TS
  },
  settings: {
    react: {
      version: "detect", // Automatically detect React version
    },
  },
};
