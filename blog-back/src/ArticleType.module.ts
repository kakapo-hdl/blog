import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleTypeController } from './controller/ArticleType.controller';
import { Article } from './model/article.model';
import { ArticleType } from './model/ArticleType.model';
import { ArticleService } from './service/Article.sercvice';
import { ArticleTypeService } from './service/ArticleType.sercvice';
@Module({
  imports: [TypeOrmModule.forFeature([ArticleType, Article])],
  providers: [ArticleTypeService],
  controllers: [ArticleTypeController],
  exports: [ArticleTypeService],
})
export class ArticleTypeMudule {}
