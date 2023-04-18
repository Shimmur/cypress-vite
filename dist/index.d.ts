type FileObject = Cypress.FileObject;
type CypressPreprocessor = (file: FileObject) => Promise<string>;
/**
 * Cypress preprocessor for running e2e tests using vite.
 *
 * @param {string} userConfigPath
 * @example
 * setupNodeEvents(on) {
 *   on(
 *     'file:preprocessor',
 *     vitePreprocessor(path.resolve(__dirname, './vite.config.ts')),
 *   )
 * },
 */
declare function vitePreprocessor(userConfigPath?: string): CypressPreprocessor;

export { vitePreprocessor as default };