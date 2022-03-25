module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {},
  overrides: [
    {
      files: ["api/createChildAccount.js"],
      rules: {
        "no-underscore-dangle": "off",
      },
    },
  ],
};
