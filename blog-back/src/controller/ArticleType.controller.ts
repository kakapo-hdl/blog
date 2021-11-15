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
} from '@nestjs/common';
import { ArticleType } from 'src/model/ArticleType.model';
import { ArticleTypeService } from 'src/service/ArticleType.sercvice';
import { Response } from 'express';
import { ArticleService } from 'src/service/Article.sercvice';

@Controller('ArticleType')
export class ArticleTypeController {
  constructor(
    // @Inject(forwardRef(() => ArticleTypeService))
    private readonly ArticleTypeService: ArticleTypeService,
  ) {}

  @Post('insert')
  async addArticleType(
    @Body() ArticleType: ArticleType,
    @Res() res: Response): Promise<Response> {
    const result = await this.ArticleTypeService.insertArticleType(ArticleType);
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
  async updateArticleType(
    @Body() ArticleType: ArticleType,
    @Res() res: Response): Promise<any> {
    const oldArticleType = await this.ArticleTypeService.getArticleTypeById(
      ArticleType.id.toString(),
    );
    oldArticleType.color = ArticleType.color;
    oldArticleType.description = ArticleType.description;
    oldArticleType.type = ArticleType.type;
    const result = await this.ArticleTypeService.updateArticleType(
      oldArticleType,
    );
    
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
  @Get('getAllMap')
  async getArticleTypeSelect(): Promise<any> {
    const data = await this.ArticleTypeService.getArticleType();
    const result: Array<{ id: number; value: string }> = [];
    data.forEach((item) => result.push({ id: item.id, value: item.type }));
    return result;
  }

  @Get('getAll')
  async getArticleTypes(): Promise<ArticleType[]> {
    const data = await this.ArticleTypeService.getArticleType();
    return data;
  }

  @Get('getAllWithArticle')
  async getArticleTypesWithArticle(): Promise<ArticleType[]> {
    const data = await this.ArticleTypeService.getArticleTypeWithArticle();
    return data;
  }
  @Get('get')
  async getArticleTypeById(
    @Query() query: { id: string },
  ): Promise<ArticleType> {
    const data = await this.ArticleTypeService.getArticleTypeById(query.id);
    return data;
  }
  @Delete('delete')
  async deleteArticleTypeById(@Param('id') id: number): Promise<any> {
    const data = await this.ArticleTypeService.DeleteArticleType(id);
    return data;
  }
}
