// user/entities/user.entity.ts
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
    @ApiProperty({ description: '用户id' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100, nullable: true })
    username: string;

    @Column({ length: 100, nullable: true })
    nickname: string;

    @Exclude() //过滤返回pwd字段
    @Column({ select: false, nullable: true })
    password: string;

    @Column({ default: null })
    avatar: string;

    @Column({ default: null })
    email: string;

    @Column({ default: null })
    openid: string;

    @Column('enum', { enum: ['root', 'author', 'visitor'], default: 'visitor' })
    role: string;

    @Column({
        name: 'create_time',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createTime: Date;

    @Exclude()
    @Column({
        name: 'update_time',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updateTime: Date;

    @BeforeInsert()
    async encryptPwd() {
        if (!this.password) return;
        this.password = await bcrypt.hashSync(this.password, 10);
    }
}