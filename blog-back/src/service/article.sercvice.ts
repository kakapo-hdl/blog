import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from 'src/model/article.model';
import { getConnection } from 'typeorm';

@Injectable()
export class ArticleService {
  // Product: Pe[];/
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) { }

  async getArticle(): Promise<Article[]> {
    const articles = await getConnection()
      .getRepository(Article)
      .createQueryBuilder('article')
      .orderBy('article.createTime', 'DESC')
      .getMany();
    return articles;
  }
  async getArticleById(id: string): Promise<Article> {
    return await this.articleRepository.findOne(id);
  }
  async updateArticle(article: Article): Promise<any> {
    article.lastUpdateTime = new Date();
    // return await getConnection()
    //   .getRepository(Article)
    //   .update({ id: article.id }, article);
    return await this.articleRepository.save(article);



  }
  async DeleteArticle(id: number): Promise<any> {
    return await this.articleRepository.delete(id);
  }
  async insertArticle(article: Article): Promise<Article> {
    article.createTime = new Date();
    article.lastUpdateTime = new Date();
    return await this.articleRepository.save(article);
  }
}
