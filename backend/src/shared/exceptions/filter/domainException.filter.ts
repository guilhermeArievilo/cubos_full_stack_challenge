import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import RequiredFieldError from "../requiredFieldError";
import { ResourceAlreadyExistError } from "../resourceAlreadyExistError";
import ResourceNotFoundError from "../resourceNotFoundError";
import InvalidCredentialsError from "../invalidCredentialsError";
import InvalidFieldError from "../invalidFieldError";
import UserPermissionError from "../userPermissionError";

@Catch(Error)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    
    if (exception instanceof HttpException) {
      throw exception;
    }

    if (exception instanceof RequiredFieldError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        errorCode: 'REQUIRED_FIELD',
        meta: {
          field: exception.field
        },
        message: exception.message,
      });
    }
    
    if (exception instanceof ResourceAlreadyExistError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        errorCode: 'RESOURCE_ALREADY_EXISTS',
        meta: exception.resource ? {
          resource: exception.resource,
          field: exception.field
        } : null,
        message: exception.message,
      });
    }
    
    if (exception instanceof ResourceNotFoundError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        errorCode: 'RECOURCE_NOT_FOUND',
        meta: exception.resource ? {
          resource: exception.resource
        } : null,
        message: exception.message,
      });
    }
    
    if (exception instanceof UserPermissionError) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        errorCode: 'PERMISSION_DENIED',
        message: exception.message,
      });
    }
    
    if (exception instanceof InvalidFieldError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        errorCode: 'INVALID_FIELD',
        message: exception.message,
      });
    }
    
    if (exception instanceof InvalidCredentialsError) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        errorCode: 'INVALID_CREDENTIALS',
        message: exception.message,
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorCode: 'INTERNAL_ERROR',
      message: 'Unexpected server error',
    });
  }
  
}