export type ApiError = {
  errorCode:
    | 'REQUIRED_FIELD'
    | 'RESOURCE_ALREADY_EXISTS'
    | 'RECOURCE_NOT_FOUND'
    | 'INVALID_CREDENTIALS'
    | 'INTERNAL_ERROR'
  message: string
  meta?: {
    field?: string
    resource?: string
  }
}
