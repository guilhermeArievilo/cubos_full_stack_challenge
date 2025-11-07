export default class InvalidFieldError extends Error {
  private _field: string;
  constructor(field: string) {
    super(`Invalid field: ${field}`);
    this._field = field;
  }

  public get field(): string {
    return this._field;
  }
}