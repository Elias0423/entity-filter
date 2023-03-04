export default class ResponseDto {
  readonly code: number;
  readonly data?: any;

  constructor(code: number, response?: any) {
    this.code = code;
    this.data = response;
  }
}
