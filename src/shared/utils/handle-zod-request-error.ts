import { HttpStatus } from '@nestjs/common';
import { ZodError } from 'zod';

export function handleZodRequestErrors(error: ZodError) {
  const errors = error.errors.map((error) => ({
    path: error.path.join('.'),
    message: error.message,
  }));

  return {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Validation failed',
    error: 'Bad Request',
    issues: errors,
  };
}
