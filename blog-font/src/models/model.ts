export interface Article {
  id?: number,
  articleTypeId?:number
  title?: string,
  author?: string,
  description?: string,
  isCrouselArticle?: boolean,
  imageUrl?: string,
  content?: string,
  createTime?: Date,
  lastUpdateTime?: Date
}

export interface ArticleType {
  id?: number,
  type?: string,
  color?: string,
  description?: string,
  createTime?: Date,
  lastUpdateTime?: Date,
  articles?: Article[]
}
export interface PersonProf {
  id?: number,
  nameChi?: string,
  nameEng?: string,
  age?: string,
  email?: string,
  description?:string,
  sex?:string,
  hobit?: string,
  hobits?: Array<string>,
  address?: string,
  birthday?: Date,
  avaterUrl?:string

}


export interface Message {
  message: string,
  type: "success" | "info" | "warning" | "error",
  isLoading?: boolean,
  time?:number,
  key?:string,
}