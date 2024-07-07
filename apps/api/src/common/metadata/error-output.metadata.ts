import { HttpStatus } from '@nestjs/common';

import { ApiException } from '@/common/exceptions/api-exception';

/**
 * Error output metadata. This metadata is used to generate the error output response.
 * Swagger uses this metadata to generate the API documentation.
 */
export const ERROR_OUTPUT_METADATA = {
  [HttpStatus.BAD_REQUEST]: {
    description: 'The request has not been processed because it lacks valid parameters.',
    type: ApiException,
  },
  [HttpStatus.UNAUTHORIZED]: {
    description: 'The request has not been processed because it lacks valid authentication credentials.',
    type: ApiException,
  },
  [HttpStatus.FORBIDDEN]: {
    description: 'The request has not been processed because it lacks valid authorization credentials.',
    type: ApiException,
  },
  [HttpStatus.NOT_FOUND]: {
    description: 'The requested resource could not be found.',
    type: ApiException,
  },
  [HttpStatus.INTERNAL_SERVER_ERROR]: {
    description: 'An unexpected error occurred while processing the request.',
    type: ApiException,
  },
};
