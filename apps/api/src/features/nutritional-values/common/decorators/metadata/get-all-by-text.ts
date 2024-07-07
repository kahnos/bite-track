import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ERROR_OUTPUT_METADATA } from '@/common/metadata/error-output.metadata';
import { GetNutritionalValuesByTextOutput } from '@/features/nutritional-values/common/dtos/outputs/get-by-text.output';

const RESPONSES_METADATA = {
  ...ERROR_OUTPUT_METADATA,
  200: {
    type: GetNutritionalValuesByTextOutput,
    description: 'Nutritional values fetched successfully.',
  },
};

export const MobileGetAllByText = () =>
  applyDecorators(
    ApiOkResponse(RESPONSES_METADATA[200]),
    ApiUnauthorizedResponse(RESPONSES_METADATA[401]),
    ApiForbiddenResponse(RESPONSES_METADATA[403]),
    ApiNotFoundResponse(RESPONSES_METADATA[404]),
    ApiOperation({
      summary: 'Get nutritional values by text',
      operationId: 'mobile-get-all-by-text',
    }),
    ApiTags('Mobile NutritionalValues'),
  );
