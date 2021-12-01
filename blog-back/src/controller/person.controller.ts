import {
  Body,
  Controller,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { convertUrl, writeFileToPublic } from 'src/constants/constants';
import { Person } from 'src/model/Person.model';
import { PersonService } from 'src/service/person.sercvice';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) { }

  @Post('update')
  @UseInterceptors(FileInterceptor('image'))
  async addArticle(
    @UploadedFile() image: Express.Multer.File,
    @Body() person: Person,
    @Res() res: Response): Promise<Response> {
    const data = await this.personService.getPerson();    
    person.avaterUrl = data.avaterUrl;
    if (image) {
      const path = writeFileToPublic('/Avater', image);
      person.avaterUrl = path;
    }
    const result = await this.personService.insertPerson(person);
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

  @Get('get')
  async getPersons(): Promise<any> {
    const data = await this.personService.getPerson();
    data.hobits = JSON.parse(data.hobits);
    data.avaterUrl = convertUrl(data.avaterUrl);
    return data;
  }
}
