import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			prettier,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'prettier/prettier': [
				'error',
				{
					trailingComma: 'es5',
					tabWidth: 2,
					useTabs: true,
					semi: false,
					singleQuote: true,
					endOfLine: 'lf',
					printWidth: 100,
					plugins: ['@ianvs/prettier-plugin-sort-imports'],
					importOrder: ['^react$', '^@/(.*)$', '', '^[./]', '^(?!.*[.]css$)[./].*$', '.css$'],
					importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
					importOrderTypeScriptVersion: '5.0.0',
					importOrderCaseSensitive: false,
				},
			],
			'func-style': ['error', 'expression'],
		},
	},
	eslintConfigPrettier
)
