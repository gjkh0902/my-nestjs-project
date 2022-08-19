
import { ArticleService, ArticleRo } from './article.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateArticleDto } from './dto/create-article.dot';//article表文档说明
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@ApiTags('文章管理')
@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    /**
     * 创建文章
     * @param record
     */
    @ApiOperation({ summary: '创建文章' })
    @Post('add')
    async create(@Body() record: CreateArticleDto) {
        return await this.articleService.create(record)
    }

    /**
     * 获取所有文章
     */
    @Get('list')
    async findAll(@Query() query): Promise<ArticleRo> {
        return await this.articleService.findAll(query)
    }

    /**
     * 获取指定文章
     * @param id 
     */
    @Get(':id')
    async findById(@Param('id') id) {
        return await this.articleService.findById(id)
    }

    /**
     * 更新文章
     * @param id 
     * @param record 
     */
    @Put(":id")
    async update(@Param("id") id, @Body() record) {
        return await this.articleService.updateById(id, record)
    }

    /**
     * 删除
     * @param id 
     */
    @Delete("id")
    async remove(@Param("id") id) {
        return await this.articleService.remove(id)
    }

}
