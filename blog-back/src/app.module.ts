import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './service/product.sercvice';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './controller/person.controller';
import { PersonService } from './service/person.sercvice';
import { PeronMudule } from './person.module';
import { database } from './config/db';
@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    TypeOrmModule.forRoot(database),
    PeronMudule
  ],
  // controllers: [PersonController, AppController, ProductsController],
  // providers: [PersonService, AppService, ProductsService],
})
export class AppModule {}
