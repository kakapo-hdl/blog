import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/model/person.model';
import { Product } from 'src/model/product.model';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {
  // Product: Pe[];/
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async getPerson(): Promise<Person[]> {
    return await this.personRepository.find();
  }
  async insertPerson(person: Person): Promise<Person> {
    // const newPerspn = new Person(
    //   'nameEng',
    //   'nameChi',
    //   'phone',
    //   'desc',
    //   'address',
    //   'sex',
    //   new Date(),
    // );
    return await this.personRepository.save(person);
  }
}
