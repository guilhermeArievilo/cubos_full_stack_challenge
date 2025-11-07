export default class ResourceNotFoundError extends Error {
  private _resource: string | undefined;
  constructor(resource?: string) {
    super(`${resource} not found`);
    this._resource = resource;

    if (!resource) {
      super("Resource not found");
    }
  }

  public get resource(): string | undefined {
    return this._resource;
  }
}