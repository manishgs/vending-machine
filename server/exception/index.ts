/* eslint max-classes-per-file: 0 */
export class HttpException extends Error {
  private statusCode: number;

  constructor(message: string, code = 500) {
    super(message);
    this.statusCode = code;
    Object.setPrototypeOf(this, HttpException.prototype);
  }

  get status() {
    return this.statusCode;
  }

  get code() {
    return this.statusCode;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = 'Bad Request') {
    super(message, 400);
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = 'Not Found') {
    super(message, 404);
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

export class ValidationException extends HttpException {
  constructor(message: string = 'Validation Failed') {
    super(message, 422);
    Object.setPrototypeOf(this, ValidationException.prototype);
  }
}