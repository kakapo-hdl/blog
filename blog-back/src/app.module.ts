import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeronMudule } from './person.module';
import { database } from './config/db';
import { ArticleMudule } from './article.module';
import { Person } from './model/Person.model';
import { Article } from './model/article.model';
import { UtilsController } from './controller/utils.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ArticleType } from './model/articleType.model';
import { ArticleTypeMudule } from './ArticleType.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '42.192.144.217',
      username: 'SA',
      password: 'nM7894561230',
      database: 'blog',
      // entities: [Article, Person, ArticleType],
      // entities: ['src/**.model{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      extra: {
        trustServerCertificate: true,
      },
    }),
    ArticleMudule,
    PeronMudule,
    ArticleTypeMudule,
  ],
  controllers: [UtilsController],
  // controllers: [PersonController, AppController, ProductsController],
  // providers: [PersonService, AppService, ProductsService],
})
export class AppModule {}
