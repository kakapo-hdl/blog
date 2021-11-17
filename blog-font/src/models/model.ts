export interface Article {
  id?: number,
  articleTypeId?:number
  title?: string,
  author?: string,
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


export interface Message {
  message?: string,
  type?: "success" | "info" | "warning" | "error",
  isLoading?: boolean,
  time?:number,
  key?:string,
}