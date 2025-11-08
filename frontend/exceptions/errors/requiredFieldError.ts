export default class RequiredFieldError extends Error {
  constructor(fieldName: string) {
    super(`${fieldName} é obrigatório.`)
    this.name = 'RequiredFieldError'
  }
}
