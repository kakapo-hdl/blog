import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  constructor(
    //  id: number,
    nameEng: string,
    nameChi: string,
    phone: string,
    description: string,
    address: string,
    sex: string,
    birthday: Date,
  ) {
    this.nameChi = nameChi;
    this.nameEng = nameEng;
    this.phone = phone;
    this.description = description;
    this.address = address;
    this.sex = sex;
    this.birthday = birthday;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameEng: string;

  @Column()
  nameChi: string;

  @Column()
  phone: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  sex: string;

  @Column()
  birthday: Date;
  
}
