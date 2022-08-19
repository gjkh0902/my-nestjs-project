import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) { }

	/**
   * 账号密码注册
   * @param createUser
   */
	async register(createUser: CreateUserDto) {
		const { username } = createUser;

		const existUser = await this.userRepository.findOne({
			where: { username },
		});
		if (existUser) {
			throw new HttpException("用户名已存在", HttpStatus.BAD_REQUEST)
		}

		const newUser = await this.userRepository.create(createUser)
		return await this.userRepository.save(newUser)
		//return await this.userRepository.findOne({ where: { username } }) //不返回pwd

	}

	findAll() {
		return `This action returns all user`;
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
