import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/model/Person.model';
import { Product } from 'src/model/product.model';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class PersonService {
  // Product: Pe[];/
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) { }

  async getPerson(): Promise<Person> {
    return await this.personRepository.findOne(1);
  }
  async insertPerson(person: Person): Promise<any> {
    person.updateTime = new Date();
    
    return await getConnection()
      .getRepository(Person)
      .update(person.id, {
        nameChi: person.nameChi,
        nameEng: person.nameEng,
        hobits: person.hobits,
        sex: person.sex,
        description: person.description,
        address: person.address,
        email: person.email,
        birthday: person.birthday,
        avaterUrl: person.avaterUrl
      });
  }
}

