

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateArticleDto {
    @ApiProperty({ description: '文章标题' })
    @IsNotEmpty({ message: '文章标题必填' })
    readonly title: string;

    @IsNotEmpty({ message: '作者必填' })
    @ApiProperty({ description: '作者' })
    readonly author: string;

    @ApiPropertyOptional({ description: '内容' })
    readonly content: string;

    @ApiPropertyOptional({ description: '文章封面' })
    readonly cover_url: string;

    @ApiProperty({ description: '文章类型' })
    @IsNumber()
    readonly type: number;
}