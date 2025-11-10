export default class FieldValidationError extends Error {
  private _field: string;
  constructor(field: string, message?: string) {
    super(message ?? `${field} is invalid.`);
    this._field = field;
  }

  public get field(): string {
    return this._field;
  }
}