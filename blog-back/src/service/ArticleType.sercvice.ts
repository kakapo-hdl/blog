import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { ArticleType } from 'src/model/ArticleType.model';
import { getConnection } from 'typeorm';
import { Article } from 'src/model/article.model';

@Injectable()
export class ArticleTypeService {
  constructor(
    @InjectRepository(ArticleType)
    private readonly ArticleTypeRepository: Repository<ArticleType>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getArticleType(): Promise<ArticleType[]> {
    const ArticleTypes = await getConnection()
      .getRepository(ArticleType)
      .createQueryBuilder('ArticleType')
      .orderBy('ArticleType.createTime', 'DESC')
      .getMany();
    return ArticleTypes;
  }

  async getArticleTypeWithArticle(): Promise<ArticleType[]> {
    // const ArticleTypes = await getConnection().getRepository(ArticleType).find({ relations: ["articles"]})

    const ArticleTypes = await getConnection()
      .getRepository(ArticleType)
      .createQueryBuilder('articleType')
      .leftJoinAndSelect('articleType.articles', 'articles')
      .orderBy('articles.id', 'ASC')
      .orderBy('ArticleType.id', 'DESC')
      .getMany();
    return ArticleTypes;
  }
  async getArticleTypeById(id: string): Promise<ArticleType> {
    return await this.ArticleTypeRepository.findOne(id);
  }
  async updateArticleType(ArticleType: ArticleType): Promise<any> {
    ArticleType.lastUpdateTime = new Date();
    return await this.ArticleTypeRepository.update(ArticleType.id, ArticleType);
  }
  async DeleteArticleType(id: number): Promise<any> {
    return await this.ArticleTypeRepository.delete(id);
  }
  async insertArticleType(ArticleType: ArticleType): Promise<ArticleType> {
    ArticleType.createTime = new Date();
    ArticleType.lastUpdateTime = new Date();
    return await this.ArticleTypeRepository.save(ArticleType);
  }
}
