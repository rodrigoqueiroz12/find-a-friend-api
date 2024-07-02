export class MissingEnvironmentVariablesError extends Error {
  constructor() {
    super('Missing environment variables.')
  }
}
