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
  Query,
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
    @Body() article: Article,

  ): Promise<any> {    
    const oldArticle = await this.ArticleService.getArticleById(article.id.toString());
    oldArticle.author = article.author;
    oldArticle.content = article.content;
    oldArticle.title = article.title;
    const result = await this.ArticleService.insertArticle(oldArticle);
    return result;
  }
  @Get('getAll')
  async getArticles(): Promise<Article[]> {
    const data = await this.ArticleService.getArticle();
    return data;
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   const data =  this.ArticleService.getArticleById(Number.parseInt(id));
  //   return data;
  // }
  @Get('get')
  async getArticleById(@Query() query:{id:string}): Promise<Article> {

    const data = await this.ArticleService.getArticleById(query.id);
    return data;

 
  }
  @Delete('delete')
  async deleteArticleById(@Param('id') id: number): Promise<any> {
    const data = await this.ArticleService.DeleteArticle(id);
    return data;
  }
}
