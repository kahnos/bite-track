import { ERROR_CODES, ErrorCode, ApiException as IApiException } from '@bite-track/types';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';

/**
 * ApiExceptionParams
 */
export interface ApiExceptionParams {
  /**
   * The message to return to the client.
   */
  message: string;

  /**
   * The error code to return to the client.
   */
  code: ErrorCode;

  /**
   * Additional data to return to the client.
   */
  data?: any;
}

/**
 * ApiException
 *
 * @description An exception that can be thrown to return a consistent error response to the client.
 */
export class ApiException extends HttpException implements IApiException {
  logger = new Logger(ApiException.name);

  @ApiProperty({
    type: 'string',
    description: 'The error code, shared between client and server.',
    example: ERROR_CODES.INTERNAL_SERVER_ERROR,
    enum: Object.values(ERROR_CODES),
    required: true,
  })
  code: ErrorCode;

  @ApiProperty({
    type: 'object',
    description: 'Additional data to return to the client.',
    example: { property: 'value' },
    required: false,
  })
  data?: any;

  @ApiProperty({
    type: 'string',
    description: 'The error message to return to the client.',
    example: 'Internal server error',
    required: true,
  })
  public readonly message: string;

  constructor(params: ApiExceptionParams) {
    const { message, code, data } = params;
    const status = ApiException.getHttpStatusFromErrorCode(code);

    super(code, status);

    this.code = code;
    this.message = message;
    this.data = data;

    delete (this as Partial<HttpException>).name;
  }

  /**
   * Creates an ApiException from a ValidationError array (from class-validator).
   * @param errors The validation errors to create the ApiException from.
   * @returns The ApiException created from the validation errors.
   */
  static fromValidationError(errors: ValidationError[]): ApiException {
    const message = 'Validation failed';
    const code = ERROR_CODES.VALIDATION;
    const data = errors.map((error) => ({
      property: error.property,
      constraints: error.constraints,
    }));

    return new ApiException({ message, code, data });
  }

  /**
   * Gets the HTTP status code from the error code.
   * @param errorCode The error code to get the HTTP status code for.
   * @returns The HTTP status code for the given error code.
   */
  static getHttpStatusFromErrorCode(errorCode: ErrorCode): number {
    let statusCode: number;
    switch (errorCode) {
      case ERROR_CODES.VALIDATION:
        statusCode = HttpStatus.BAD_REQUEST;
        break;
      case ERROR_CODES.NUTRITIONAL_VALUES__NOT_FOUND:
        statusCode = HttpStatus.NOT_FOUND;
        break;
      case ERROR_CODES.INTERNAL_SERVER_ERROR:
      default:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }

    return statusCode;
  }
}
