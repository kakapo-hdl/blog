import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './controller/person.controller';
import { Person } from './model/person.model';
import { PersonService } from './service/person.sercvice';
@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PersonService],
  controllers: [PersonController],
})
export class PeronMudule {}
