export default class InvalidCredentialsError extends Error {
  constructor() {
    super('Credenciais inválidas.')
  }
}
