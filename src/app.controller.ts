import { Controller, Get, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('公共接口')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: 'hello world' })
  @Get('info')
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'put请求' })
  @Put('list/user')
  update(): object {
    return { a: 3 };
  }
}
