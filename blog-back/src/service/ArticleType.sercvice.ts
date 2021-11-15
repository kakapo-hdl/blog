import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleType } from 'src/model/ArticleType.model';
import { getConnection } from 'typeorm';

@Injectable()
export class ArticleTypeService {
  constructor(
    @InjectRepository(ArticleType)
    private readonly ArticleTypeRepository: Repository<ArticleType>,
  ) {}

  async getArticleType(): Promise<ArticleType[]> {
    const ArticleTypes = await getConnection()
      .getRepository(ArticleType)
      .createQueryBuilder('ArticleType')
      .orderBy('ArticleType.createTime', 'DESC')
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
