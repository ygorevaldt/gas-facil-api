import { PipeTransform, BadRequestException } from '@nestjs/common';
import { handleZodRequestErrors } from 'src/shared/utils';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (!(error instanceof ZodError)) {
        throw new BadRequestException('Validation failed');
      }

      throw new BadRequestException(handleZodRequestErrors(error));
    }
  }
}
