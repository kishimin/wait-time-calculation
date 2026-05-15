import js from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import { jsdoc } from "eslint-plugin-jsdoc";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import testingLibrary from "eslint-plugin-testing-library";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      tseslint.configs.recommendedTypeChecked,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      eslintPluginJsxA11y.flatConfigs.recommended,
    ],
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: { projectService: true },
    },
    rules: {
      "no-console": "warn",
      camelcase: ["warn", { properties: "never" }],
      "@typescript-eslint/switch-exhaustiveness-check": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: [
      "**/*.test.{ts,tsx}",
      "**/*.spec.{ts,tsx}",
      "**/__tests__/**/*.{ts,tsx}",
      "**/tests/**/**/*.{ts,tsx}",
    ],
    ...testingLibrary.configs["flat/react"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "@typescript-eslint/no-unsafe-call": "off",
      "vitest/max-nested-describe": ["error", { max: 3 }],
      "vitest/no-focused-tests": "error",
      "vitest/no-disabled-tests": "warn",
    },
    settings: {
      vitest: { typecheck: true },
    },
    languageOptions: { globals: { ...vitest.environments.env.globals } },
  },
  prettier,
  jsdoc({
    config: "flat/recommended",
    rules: {
      "jsdoc/require-param": "off",
      "jsdoc/require-returns": "off",
      "jsdoc/require-description": "off",
      "jsdoc/check-values": [
        "error",
        {
          allowedLicenses: ["MIT", "ISC"],
        },
      ],
      "jsdoc/require-jsdoc": [
        "error",
        {
          publicOnly: true,
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
          },
        },
      ],
    },
    settings: {
      structuredTags: {
        see: {
          name: "namepath-referencing",
          required: ["name"],
        },
      },
    },
  }),
  {
    files: ["!src/**/*"],
    ...tseslint.configs.disableTypeChecked,
  },
]);
