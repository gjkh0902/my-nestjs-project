import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './entities/article.entity';

export interface ArticleRo {
    list: ArticleEntity[];
    count: number;
}

//文章service
@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
    ) { }

    // 创建文章
    async create(record: Partial<ArticleEntity>): Promise<ArticleEntity> {
        const { title } = record;
        if (!title) {
            throw new HttpException('缺少文章标题', 401);
        }
        const doc = await this.articleRepository.findOne({ where: { title } });
        if (doc) {
            throw new HttpException('文章已存在', 401);
        }
        return await this.articleRepository.save(record);
    }

    // 获取文章列表
    async findAll(query): Promise<ArticleRo> {
        // const qb = await getRepository(ArticleEntity).createQueryBuilder('post');
        // qb.orderBy('post.create_time', 'DESC');
        const qb = await this.articleRepository.createQueryBuilder('article').orderBy('article.create_time', 'DESC');
        const count = await qb.getCount();
        const { pageNum = 1, pageSize = 10, ...params } = query;
        qb.limit(pageSize);
        qb.offset(pageSize * (pageNum - 1));

        const datas = await qb.getMany();
        return { list: datas, count: count };
    }

    // 获取指定文章
    async findById(id): Promise<ArticleEntity> {
        return await this.articleRepository.findOne(id);
    }

    // 更新文章
    async updateById(id, post): Promise<ArticleEntity> {
        const existPost = await this.articleRepository.findOne(id);
        if (!existPost) {
            throw new HttpException(`id为${id}的文章不存在`, 401);
        }
        const updatePost = this.articleRepository.merge(existPost, post);
        return this.articleRepository.save(updatePost);
    }

    // 刪除文章
    async remove(id) {
        const existPost = await this.articleRepository.findOne(id);
        if (!existPost) {
            throw new HttpException(`id为${id}的文章不存在`, 401);
        }
        return await this.articleRepository.remove(existPost);
    }

}
