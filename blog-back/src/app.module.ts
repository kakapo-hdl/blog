
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeronMudule } from './person.module';
import { database } from './config/db';
import { ArticleMudule } from './article.module';
import { Person } from './model/person.model';
import { Article } from './model/article.model';
@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '42.192.144.217',
      // port: 1433,
      username: 'SA',
      password: 'nM7894561230',
      database: 'blog',
      entities: [Article,Person],

      // entities: ['src/**.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      extra: {
        trustServerCertificate: true,
      },
    }),
   ArticleMudule, PeronMudule
  ],
  // controllers: [PersonController, AppController, ProductsController],
  // providers: [PersonService, AppService, ProductsService],
})
export class AppModule {}
