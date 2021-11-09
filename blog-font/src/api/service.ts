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