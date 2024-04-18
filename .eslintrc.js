module.exports = {
  env: {
    node: true,
    jest: true,
  },
  extends: [`eslint:recommended`, `plugin:@typescript-eslint/recommended`, `plugin:prettier/recommended`],
  parser: `@typescript-eslint/parser`,
  plugins: [`@typescript-eslint`, `prettier`],
  root: true,
  rules: {
    // Use backtick for quotes
    // quotes: `off`,
    // "@typescript-eslint/quotes": [
    //   2,
    //   `backtick`,
    //   {
    //     avoidEscape: true,
    //   },
    // ],
    // Do not use trailing comma
    'prettier/prettier': [
      `error`,
      {
        trailingComma: `es5`,
        semi: true,
        singleQuote: true,
        printWidth: 120,
      },
    ],
    '@typescript-eslint/array-type': [`error`, { default: `generic` }],
    '@typescript-eslint/ban-types': [
      `error`,
      {
        extendDefaults: true,
        types: {
          '{}': {
            fixWith: `Record<string, unknown>`,
          },
          object: {
            fixWith: `Record<string, unknown>`,
          },
        },
      },
    ],
    '@typescript-eslint/naming-convention': [
      `error`,
      {
        selector: `default`,
        format: [`camelCase`],
        leadingUnderscore: `allow`,
        trailingUnderscore: `allow`,
      },
      {
        selector: `variable`,
        format: [`camelCase`, `UPPER_CASE`],
        leadingUnderscore: `allow`,
        trailingUnderscore: `allow`,
      },
      {
        selector: `typeLike`,
        format: [`PascalCase`],
      },
      {
        selector: `parameter`,
        format: [`camelCase`],
        leadingUnderscore: `allow`,
      },
      {
        selector: `memberLike`,
        modifiers: [`private`],
        format: [`camelCase`],
        leadingUnderscore: `require`,
      },
      {
        selector: `objectLiteralProperty`,
        format: null,
      },
      {
        selector: `interface`,
        format: [`PascalCase`],
        prefix: [`I`],
      },
      {
        selector: 'typeProperty',
        format: null, // This disables the format requirement for interface properties
      },
    ],
  },
  overrides: [
    {
      files: [`packages/site/src/**/*.tsx`],
      rules: {
        '@typescript-eslint/naming-convention': 0,
      },
    },
    {
      files: [`packages/plugin/src/plugin-options-schema.ts`],
      rules: {
        '@typescript-eslint/naming-convention': 0,
      },
    },
  ],
};
