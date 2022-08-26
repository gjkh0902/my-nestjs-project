import {
  Controller, Get, Post, Body, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor,
  Headers, Res
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { urlencoded } from 'express';
import * as urlencode from 'urlencode';
import { WechatLoginDto } from './dto/wechat-login.dto';

@ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: '账号密码登录' })
  @Post('login')
  async login(@Body() user: LoginDto, @Req() req) {
    return await this.authService.login(req.user);
  }

  @ApiOperation({ summary: '微信登录跳转' })
  @Get('wechatLogin')
  async wechatLogin(@Headers() header, @Res() res) {

    const APPID = process.env.APPID;
    const redirectUri = urlencode(
      'http://www.inode.club'
    );
    res.redirect(
      `https://open.weixin.qq.com/connect/qrconnect?appid=${APPID}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`,
    );
  }

  @ApiOperation({ summary: '微信登录' })
  @ApiBody({ type: WechatLoginDto, required: true })
  @Post('wechat')
  async loginWithWechat(@Body('code') code: string) {
    return this.authService.loginWithWechat(code);
  }

}