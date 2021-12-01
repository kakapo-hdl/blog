import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  constructor(
    //  id: number,
    nameEng: string,
    nameChi: string,
    hobits: string,
    description: string,
    address: string,
    sex: string,
    email:string,
    birthday: Date,
    avaterUrl:string
  ) {
    this.nameChi = nameChi;
    this.nameEng = nameEng;
    this.hobits = hobits;
    this.sex = sex;
    this.description = description;
    this.address = address;
    this.email = email;
    this.birthday = birthday;
    this.avaterUrl = avaterUrl;
  }

  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, type: 'nvarchar' })
  nameEng: string;
  @Column({ nullable: true, type: 'nvarchar' })
  nameChi: string;
  @Column({ nullable: true, type: 'nvarchar' })
  description: string;
  @Column({ nullable: true, type: 'nvarchar' })
  address: string;
  @Column({ nullable: true, type: 'nvarchar' })
  sex: string;
  @Column({ nullable: true, type: 'nvarchar' })
  email: string;
  @Column({ nullable: true, type: 'nvarchar' })
  hobits: string;
  @Column({ nullable: true, type: 'nvarchar' })
  avaterUrl: string;
  @Column({ nullable: true, type: 'datetime' })
  birthday: Date;
  @Column({ nullable: true, type: 'datetime' })
  updateTime:Date;
}
