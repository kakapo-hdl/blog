import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Article } from 'src/model/article.model';
import { ArticleService } from 'src/service/Article.sercvice';

@Controller('article')
export class ArticleController {
  constructor(
    // @Inject(forwardRef(() => ArticleService))
    private readonly ArticleService: ArticleService,
  ) {}

  @Post('insert')
  addArticle(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('author') author: string,
  ): any {
    const article = new Article(title, author, content);
    this.ArticleService.insertArticle(article);
    // this.productService.insertProduct(proTitle, proDesc, proPpice);
  }
  @Put('update')
  async updateArticle(
    @Body('id') id: number,
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('author') author: string,
  ): Promise<any> {
    const oldArticle = await this.ArticleService.getArticleById(id);
    oldArticle.author = author;
    oldArticle.content = content;
    oldArticle.title = title;
    const result = await this.ArticleService.insertArticle(oldArticle);
    return result;
    // this.productService.insertProduct(proTitle, proDesc, proPpice);
  }
  @Get('getAll')
  async getArticles(): Promise<Article[]> {
    const data = await this.ArticleService.getArticle();
    return data;
  }
  @Get(':id')
  async getArticleById(@Param('id') id: number): Promise<Article> {
    const data = await this.ArticleService.getArticleById(id);
    return data;
  }
  @Delete(':id')
  async deleteArticleById(@Param('id') id: number): Promise<any> {
    const data = await this.ArticleService.DeleteArticle(id);
    return data;
  }
}
