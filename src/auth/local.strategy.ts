// local.strategy.ts
import { compareSync } from 'bcryptjs';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

export class LocalStorage extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {

        super({
            usernameField: 'username',
            passwordField: 'password',
        } as IStrategyOptions);
    }

    async validate(username: string, password: string) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password') //不添加此行查不到密码
            .where('user.username=:username', { username })
            .getOne();

        if (!user) {
            throw new BadRequestException('用户名不正确！');
        }

        if (!compareSync(password, user.password)) {
            throw new BadRequestException('密码错误！');
        }

        return user;
    }
}
