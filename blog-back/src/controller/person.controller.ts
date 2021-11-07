import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { PersonService } from 'src/service/person.sercvice';

@Controller('person')
export class PersonController {
  constructor(
    // @Inject(forwardRef(() => PersonService))
    private readonly personService: PersonService,
  ) {}

  @Post('insert')
  addPerson(
    @Body('nameEng') proTitle: string,
    @Body('nameChi') proDesc: string,
    @Body('price') proPpice: number,
  ): any {
    // this.productService.insertProduct(proTitle, proDesc, proPpice);
  }

  @Get('getAll')
  getPersons(): any {
    // const products = this.getProduct();
    const data = this.personService.getPerson();

    return data;
  }
}
