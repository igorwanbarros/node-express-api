import { InternalError } from "./internal-error"

interface ValidationMessageError {
  field: string
  message: string
}

export class ApiValidationError extends InternalError {
  constructor(
    private messageError: Array<ValidationMessageError>,
    message = 'An error ocurred.',
    code = 500
  ) {
    super(message, code)
  }

  public errors(): Record<string, string> {
    return this.messageError.reduce(
      (acc, key) => ({ ...acc, [key.field]: key.message }),
      {}
    )
  }
}

export class ApiError extends InternalError {
}
