import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService
	) { }

	//生成jwt-token
	createToken(user: Partial<User>) {
		return this.jwtService.sign(user);
	}

	//登录
	async login(user: Partial<User>) {
		const token = this.createToken({
			id: user.id,
			username: user.username,
			role: user.role,
		});

		return { token };
	}

	//查询用户
	async getUser(user) {
		return await this.userService.findOne(user.id);
	}
}
