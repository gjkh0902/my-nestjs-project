import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
//本地验证
import { PassportModule } from '@nestjs/passport';
import { LocalStorage } from './local.strategy';
import { JwtStorage } from './jwt.strategy';
//jwt
import { User } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from '@nestjs/axios';

//test
const jwtModule = JwtModule.registerAsync({
	inject: [ConfigService],
	useFactory: async (configService: ConfigService) => {
		return {
			secret: configService.get('SECRET'),
			signOptions: { expiresIn: '4h' }
		}
	}
})

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		PassportModule,
		jwtModule,
		UserModule,
		HttpModule
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStorage, JwtStorage],
	exports: [jwtModule]
})
export class AuthModule { }
