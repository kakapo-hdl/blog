import { Entity, Column, PrimaryGeneratedColumn, IsNull } from 'typeorm';

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

  @Column({nullable: true})
  title: string;

  @Column({nullable: true})
  author: string;

  @Column({nullable: true})

  content: string;

  @Column({nullable: true})
  createTime: Date;

  @Column({nullable: true})
  lastUpdateTime: Date;
}
