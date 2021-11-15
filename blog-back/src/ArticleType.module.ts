import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleTypeController } from './controller/ArticleType.controller';
import { ArticleType } from './model/ArticleType.model';
import { ArticleTypeService } from './service/ArticleType.sercvice';
@Module({
  imports: [TypeOrmModule.forFeature([ArticleType])],
  providers: [ArticleTypeService],
  controllers: [ArticleTypeController],
})
export class ArticleTypeMudule {}
