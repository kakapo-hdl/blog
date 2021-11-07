import axios from 'axios'

export const getArticle = async(id?: number)=>{
  return await axios.get('/api/person/getAll')
}
export const insertArticle = async(data: any)=>{
  return await axios.post('/api/article/insert',data)
}