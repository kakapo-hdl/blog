import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ArticleType } from 'src/model/ArticleType.model';
import { ArticleTypeService } from 'src/service/ArticleType.sercvice';
import { Response } from 'express';

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
    @Res() res: Response ): Promise<any> {
    const oldArticleType = await this.ArticleTypeService.getArticleTypeById(
      ArticleType.id.toString(),
    );
    oldArticleType.color = ArticleType.color;
    oldArticleType.description = ArticleType.description;
    oldArticleType.type = ArticleType.type;
    const result = await this.ArticleTypeService.insertArticleType(
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
  @Get('getAll')
  async getArticleTypes(): Promise<ArticleType[]> {
    const data = await this.ArticleTypeService.getArticleType();
    return data;
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   const data =  this.ArticleTypeService.getArticleTypeById(Number.parseInt(id));
  //   return data;
  // }
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
