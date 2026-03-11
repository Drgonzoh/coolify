import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginImportX, { importX } from "eslint-plugin-import-x";
import svelte from "eslint-plugin-svelte";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import svelteConfig from "./svelte.config.ts";

// import prettier from 'eslint-plugin-prettier';

export default defineConfig(
	js.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	importX.flatConfigs.recommended, // TS error is an Upstream issue https://github.com/un-ts/eslint-plugin-import-x/issues/421 & https://github.com/typescript-eslint/typescript-eslint/issues/11543
	importX.flatConfigs.typescript,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		ignores: ["vendor/**", "public/build/**", "public/vendor/**", "resources/js/wayfinder/**"],
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: "error",
			reportUnusedInlineConfigs: "error",
		},
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				projectService: true,
				ecmaFeatures: {
					impliedStrict: true,
				},
			},
		},
		plugins: {
			"import-x": pluginImportX,
		},
	},
	{
		files: ["**/*.svelte", "**/*.svelte.ts"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: [".svelte"],
				parser: tseslint.parser, // this is needed for svelte files with lang="ts" set to be parsed correctly.
				svelteConfig,
			},
		},
	},
	{
		settings: {
			"import-x/extensions": [".svelte", ".ts"],
			"import-x/parsers": {
				"@typescript-eslint/parser": [".ts"],
			},
			svelte: {
				// Specifies an array of rules to ignore reports within the template.
				ignoreWarnings: [
					"@typescript-eslint/no-unsafe-assignment",
					"@typescript-eslint/no-unsafe-member-access",
					"@typescript-eslint/no-unsafe-call", // are these all always false positives?
				],
			},
		},
	},
	{
		files: ["**/*.{ts,mts,cts}"],
		rules: {
			"no-undef": "off", // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
		},
	},
);
