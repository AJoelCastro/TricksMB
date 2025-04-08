module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // solo si usas TS
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser', // solo si usas TS
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/react-in-jsx-scope': 'off', // innecesario en RN
    'react/jsx-uses-react': 'off',
  },
};
