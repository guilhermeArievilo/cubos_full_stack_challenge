export class ResourceAlreadyExistError extends Error {
  private _resource: string | undefined;
  private _field: string | undefined;

  constructor(errorOptions?: {resource: string, field?: string}) {
    const { resource, field } = errorOptions || {};
    super(field ? `${resource} already exists with ${field}` : `${resource} already exists`);
    this._resource = resource;
    this._field = field;
    
    if (!resource) {
      super("Resource already exists");
    }
  }

  public get resource(): string | undefined {
    return this._resource;
  }

  public get field(): string | undefined {
    return this._field;
  }
}