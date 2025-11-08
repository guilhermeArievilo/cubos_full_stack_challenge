import { ApiError } from '@/core/exceptions/dto/remoteHttpApiError'
import InvalidCredentialsError from '@/core/exceptions/errors/invalidCredentials'
import RequiredFieldError from '@/core/exceptions/errors/requiredFieldError'
import ResourceAlreadyExist from '@/core/exceptions/errors/resourceAlreadyExist'
import ResourceNotFound from '@/core/exceptions/errors/resourceNotFound'
import { AxiosError } from 'axios'

export function httpErrorHandler(error: any) {
  if (error instanceof AxiosError) {
    const errorData: ApiError = error.response?.data

    if (errorData.errorCode === 'REQUIRED_FIELD' && errorData.meta?.field) {
      throw new RequiredFieldError(errorData.meta.field)
    }

    if (errorData.errorCode === 'RESOURCE_ALREADY_EXISTS') {
      throw new ResourceAlreadyExist(
        errorData.meta?.resource
          ? { resource: errorData.meta.resource, field: errorData.meta.field }
          : undefined,
      )
    }

    if (errorData.errorCode === 'RECOURCE_NOT_FOUND') {
      throw new ResourceNotFound(errorData.meta?.resource)
    }

    if (errorData.errorCode === 'INVALID_CREDENTIALS') {
      throw new InvalidCredentialsError()
    }
  }

  throw error
}
