import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  activate() {
    return { status: HttpStatus.OK, message: 'The Webservice is Online!' };
  }
}
