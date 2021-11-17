import axios from 'axios'
export const getArticle = async()=>{
  return await axios.get('/api/article/getAll')
}
export const insertArticle = async(data: any)=>{
  return await axios.post('/api/article/insert',data)
}
export const updateArticle = async(data: any)=>{
  return await axios.put('/api/article/update',data)
}
export const getArticleById = async(id: number)=>{
  return await axios.get('/api/article/get',{params:{id:id}})
}

export const getArticleType = async()=>{
  return await axios.get('/api/ArticleType/getAll')
}
export const getArticleTypeWithArticle = async()=>{
  return await axios.get('/api/ArticleType/getAllWithArticle')
}
export const getArticleTypeMap = async()=>{
  return await axios.get('/api/ArticleType/getAllMap')
}
export const insertArticleType = async(data: any)=>{
  return await axios.post('/api/ArticleType/insert',data)
}
export const updateArticleType = async(data: any)=>{
  return await axios.put('/api/ArticleType/update',data)
}
export const getArticleTypeById = async(id: number)=>{
  return await axios.get('/api/ArticleType/get',{params:{id:id}})
}