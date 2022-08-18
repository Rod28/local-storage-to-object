/**
 * To review the configuration of this file, as well as add or delete properties,
 * consult the following link.
 *
 * @see https://jestjs.io/docs/configuration
 */
module.exports = {
	verbose: true,
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/']
};
