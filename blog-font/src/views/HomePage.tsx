// import { Footer } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { Container, Grid, Card, Avatar } from "@material-ui/core";
import Chip from '@mui/material/Chip';
import Carousel from "../components/Crousel/Crousel";
import ListArticle from "../components/ListArticle/ListArticle";
import { getCarouselArticle, getPerson } from "../api/service";
import { Article, PersonProf } from "../models/model";
import { CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { MyAvatar } from "./Style";

import { useSelector, useDispatch } from 'react-redux'
import {fetchUserById} from "../reducers/HomeReducers";
import { RootState } from "../store/Store";
export interface HomePageProps {

}



const HomePage: React.FC<(HomePageProps)> = (props) => {
   const {person,imageUrl,articleList} = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserById())
  }, [])
  return (
    <>
      <Container fixed maxWidth={'lg'} style={{ height: '100vh', paddingTop: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={9} md={9}>
            <Carousel switchTime={4000} imageUrl={imageUrl}></Carousel>
            <ListArticle articles={articleList} ></ListArticle>
          </Grid>
          <Grid item xs={3} md={3}>
            <Card style={{
              backgroundSize: 'cover'
            }}>
              <Stack
                style={{ marginTop: 10 }}
                alignItems="center"
              >
                <MyAvatar
                  src={person.avaterUrl}
                >MD</MyAvatar>
              </Stack>
              <CardContent>
                <Typography align={'center'} variant='h6' component="div">
                  {person.nameChi} &nbsp;  {person.nameEng}
                </Typography>
                <Typography style={{ marginTop: 10 }} align={'left'} variant='subtitle2' component="div">
                  {person.email}
                </Typography>
                <Stack style={{ marginTop: 10 }} flexWrap={'wrap'} direction="row" spacing={1}>
                  <label htmlFor="icon-button-file">爱好：</label>
                  {person.hobits ? person.hobits.map((element: string, index: number) => {
                    return (
                      <Chip size={'small'} style={{
                        border: '1px solid rgba(46, 125, 50, 0.7)',
                        borderRadius: 16
                      }} label={element} color="success" variant="outlined" />
                    )
                  }) : null}
                </Stack>
                {/* </Typography> */}
                <Typography style={{ marginTop: 10 }} variant="subtitle2" color="text.secondary">
                  关于我：{person.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default HomePage;



