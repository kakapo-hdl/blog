import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Article } from 'src/model/article.model';
import { ArticleService } from 'src/service/Article.sercvice';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { convertUrl, writeFileToPublic } from 'src/constants/constants';

@Controller('article')
export class ArticleController {
  constructor(
    // @Inject(forwardRef(() => ArticleService))
    private readonly ArticleService: ArticleService,
  ) { }

  @Post('insert')
  @UseInterceptors(FileInterceptor('image'))

  async addArticle(
    @UploadedFile() image: Express.Multer.File,
    @Body() article: Article,
    @Res() res: Response): Promise<Response> {
    if (image) {
      const path = writeFileToPublic('/ArticleImage', image);
      article.imageUrl = path;
    }
    const result = await this.ArticleService.insertArticle(article);
    if (result != null) {
      return res
        .status(HttpStatus.OK)
        .send({ data: result, mes: 'create success' });
    } else {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ mes: 'create error' });
    }
  }


  @Put('update')
  @UseInterceptors(FileInterceptor('image'))
  async updateArticle(
    @UploadedFile() image: Express.Multer.File,
    @Body() article: Article,
    @Res() res: Response): Promise<any> {
    const oldArticle = await this.ArticleService.getArticleById(
      article.id.toString(),
    );
    if (image) {
      const path = writeFileToPublic('/ArticleImage', image);
      oldArticle.imageUrl = path;
    }
    oldArticle.author = article.author;
    oldArticle.content = article.content;
    oldArticle.title = article.title;
    oldArticle.articleTypeId = article.articleTypeId;
    oldArticle.description = article.description;
    if (typeof article.isCrouselArticle === 'string') {
      if (article.isCrouselArticle === 'true')
        oldArticle.isCrouselArticle = true;
      else
        oldArticle.isCrouselArticle = false;
    }
    const result = await this.ArticleService.updateArticle(oldArticle);
    if (result != null) {
      return res
        .status(HttpStatus.OK)
        .send({ data: result, mes: 'update success' });
    } else {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ mes: 'update error' });
    }
  }
  @Get('getAll')
  async getArticles(): Promise<Article[]> {
    const data = await this.ArticleService.getArticle();
    return data;
  }
  @Get('get')
  async getArticleById(@Query() query: { id: string }): Promise<Article> {
    const data = await this.ArticleService.getArticleById(query.id);
    if (data) {
      data.imageUrl = convertUrl(data.imageUrl);
    }
    return data;
  }
  @Delete('delete')
  async deleteArticleById(@Param('id') id: number): Promise<any> {
    const data = await this.ArticleService.DeleteArticle(id);
    return data;
  }
}
