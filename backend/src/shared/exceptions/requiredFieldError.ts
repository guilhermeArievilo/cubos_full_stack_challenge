export default class RequiredFieldError extends Error {
  private _field: string;
  constructor(field: string) {
    super(`${field} is required`);
    this._field = field;
  }

  public get field(): string {
    return this._field;
  }
}