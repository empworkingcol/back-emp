// src/common/filters/prisma-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Manejo de errores específicos de Prisma
    if (exception.code === 'P2002') {
      status = HttpStatus.CONFLICT;
      message = 'Unique constraint violation, duplicate entry';
    } else if (exception.code === 'P2025') {
      status = HttpStatus.NOT_FOUND;
      message = 'No record found';
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      details:
        exception.meta && exception.meta.target
          ? `Field: ${exception.meta.target}`
          : undefined,
    });
  }
}
