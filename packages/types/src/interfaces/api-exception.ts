export abstract class ApiException extends Error {
  public readonly message: string;
  public readonly code: string;
  public readonly data?: any;

  protected constructor(message: string, code: string, data?: any) {
    super(message);
    this.message = message;
    this.code = code;
    this.data = data;
  }
}
