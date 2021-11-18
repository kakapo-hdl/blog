import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ArticleType } from './ArticleType.model';

@Entity()
export class Article {
  constructor(
    id?: number,
    articleTypeId?: number,
    title?: string,
    description?: string,
    isCrouselArticle?: boolean,
    imageUrl?: string,
    author?: string,
    content?: string,
    createTime?: Date,
    lastUpdateTime?: Date,
  ) {
    this.id = id;
    this.articleTypeId = articleTypeId;
    this.title = title;
    this.author = author;
    this.content = content;
    this.description = description;
    this.isCrouselArticle = isCrouselArticle;
    this.imageUrl = imageUrl;
    this.createTime = createTime;
    this.lastUpdateTime = lastUpdateTime;
  }

  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  //@IsNotEmpty()
  @Column({ nullable: true })
  @JoinColumn({ name: 'articleTypeId' })
  articleTypeId: number;

  //@IsNotEmpty()
  @Column({ nullable: true, type: 'nvarchar' })
  title: string;

  //@IsNotEmpty()
  @Column({ nullable: true, type: 'nvarchar' })
  description: string;

  //@IsNotEmpty()
  @Column({ nullable: true, type: 'bit', default: false })
  isCrouselArticle: boolean;

  // @IsNotEmpty(false)
  @Column({ nullable: true, type: 'nvarchar', length: 1000 })
  imageUrl: string;

  //@IsNotEmpty()
  @Column({ nullable: true, type: 'nvarchar' })
  author: string;

  //@IsNotEmpty()
  @Column({ nullable: true, type: 'ntext' })
  content: string;

  @Column({ nullable: true })
  createTime: Date;

  @Column({ nullable: true })
  lastUpdateTime: Date;

  @ManyToOne(() => ArticleType, (article) => article.articles)
  articleType: ArticleType;
}
