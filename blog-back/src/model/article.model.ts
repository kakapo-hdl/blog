import { Entity, Column, PrimaryGeneratedColumn, IsNull } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity()
export class Article {
  constructor(
    //  id: number,
    title?: string,
    author?: string,
    content?: string,
    createTime?: Date,
    lastUpdateTime?: Date,
  ) {
    this.title = title;
    this.author = author;
    this.content = content;
    this.createTime = createTime;
    this.lastUpdateTime = lastUpdateTime;
  }
 
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({nullable: true})
  title: string;

  @IsNotEmpty()
  @Column({nullable: true,type: 'ntext'})
  author: string;

  @IsNotEmpty()
  @Column({nullable: true  ,type: 'ntext'})
  content: string;
 
  @Column({nullable: false})
  createTime: Date;

  @Column({nullable: true})
  lastUpdateTime: Date;
}
