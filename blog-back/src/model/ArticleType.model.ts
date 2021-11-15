import { Entity, Column, PrimaryGeneratedColumn, IsNull, OneToMany, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Article } from './article.model';

@Entity()
export class ArticleType {
  constructor(
    id?: number,
    type?: string,
    color?: string,
    description?: string,
    createTime?: Date,
    lastUpdateTime?: Date,
  ) {
    this.id = id;
    this.type = type;
    this.color = color;
    this.description = description;
    this.createTime = createTime;
    this.lastUpdateTime = lastUpdateTime;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ nullable: true, type: 'varchar', length: 255 })
  type: string;

  @IsNotEmpty()
  @Column({ nullable: true, type: 'varchar', length: 100 })
  color: string;

  @IsNotEmpty()
  @Column({ nullable: true, type: 'varchar', length: 255 })
  description: string;

  @Column({ nullable: false })
  createTime: Date;

  @Column({ nullable: false })
  lastUpdateTime: Date;

  @OneToMany(type => Article, article => article.articleType)
  articles: Article[];
}
