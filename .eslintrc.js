module.exports = {
	env: {
		es2020: true,
		node: true,
	},
	extends: "@guardian/eslint-config",
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint"],
	rules: {},
};
