import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  content: string;

  @Column()
  createTime: Date;

  @Column()
  lastUpdateTime: Date;
}
