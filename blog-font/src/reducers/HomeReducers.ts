import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article, PersonProf } from '../models/model'
import * as api from '../api/service'

export const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async () => {
    const resPerson = await api.getPerson()
    const resArticles = await api.getCarouselArticle();
    const { Articles, CrouselArticles } = resArticles.data as { Articles: Article[], CrouselArticles: Article[] };

    return {crouselArticle: CrouselArticles,person:resPerson.data,articleList: Articles}
  }
)
export const HOME = 'home'
export interface HomeState {
  articleList: Article[],
  imageUrl: string[],
  person: PersonProf,
}
export const initialHomeState: HomeState = {
  articleList: [],
  imageUrl: [],
  person: {}
}
export const homeSlice = createSlice({
  name: HOME,
  initialState:initialHomeState,
  reducers: {
  },
  extraReducers:(builder) =>{
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      const payload =  action.payload as {crouselArticle: Article[],person:PersonProf,articleList: Article[]};  
      const urls: string[] = []
      payload.crouselArticle.forEach(item => urls.push(item.imageUrl!))
      state.person =  payload.person;
      state.imageUrl =urls;
      state.articleList = payload.articleList;
    })  }
})
export default homeSlice.reducer;
