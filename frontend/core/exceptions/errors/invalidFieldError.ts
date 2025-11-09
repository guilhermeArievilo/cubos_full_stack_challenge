export default class InvalidFieldError extends Error {
  constructor(fieldName: string) {
    super(`${fieldName} é inválido.`)
    this.name = 'RequiredFieldError'
  }
}
