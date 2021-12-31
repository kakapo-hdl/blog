import axios from 'axios'
export const getCarouselArticle = async()=>{
  return await axios.get('/api/article/getCarouselArticle')
}
export const getArticle = async()=>{
  return await axios.get('/api/article/getAll')
}
export const insertArticle = async(data: any)=>{
  return await axios.post('/api/article/insert',data,{headers:{'Content-Type': 'multipart/form-data'}})
}
export const updateArticle = async(data: any)=>{
  return await axios.put('/api/article/update',data,{headers:{'Content-Type': 'multipart/form-data'}} )
}

export const updatePersonProfile = async(data: any)=>{
  return await axios.post('/api/person/update',data,{headers:{'Content-Type': 'multipart/form-data'}})
}

export const getPerson = async() =>{
  return await axios.get('/api/person/get')
}
export const getArticleById = async(id: number) =>{
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