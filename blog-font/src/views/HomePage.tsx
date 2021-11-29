// import { Footer } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { Container, Grid, Card, Avatar } from "@material-ui/core";
import Carousel from "../components/Crousel/Crousel";
import ListArticle from "../components/ListArticle/ListArticle";
import { getCarouselArticle } from "../api/service";
import { Article } from "../models/model";
import { Button, CardActionArea, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { deepOrange, deepPurple } from '@mui/material/colors';
import { MyAvatar } from "./Style";


export interface HomePageProps {

}



const HomePage: React.FC<(HomePageProps)> = (props) => {
  const [imgsUrl, setImgsUrl] = React.useState<string[]>([])
  const [articles, setArticles] = React.useState<Article[]>([])
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getCarouselArticle();
      if (response.status === 200) {
        const { Articles, CrouselArticles } = response.data as { Articles: Article[], CrouselArticles: Article[] };
        const urls: string[] = []
        Articles.forEach(item => urls.push(item.imageUrl!))
        setImgsUrl(urls);
        setArticles(CrouselArticles);

      }
      // ...
    }
    fetchData();
  }, [])
  return (
    <>
      <Container fixed maxWidth={'lg'} style={{ height: '100vh', paddingTop: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={9} md={9}>
            {/* <div style={{ height: 'calc(50vh)', width: "100%", marginBottom: 10 }}> */}
            <Carousel switchTime={4000} imageUrl={imgsUrl}></Carousel>
            {/* </div> */}
            <ListArticle articles={articles} ></ListArticle>
          </Grid>
          <Grid item xs={3} md={3}>
            <Card style={{
              //  opacity:0.4,
              // backgroundImage: 'url(https://cdn.pixabay.com/photo/2020/06/30/12/16/flower-of-life-5356192_960_720.png)',
              backgroundSize: 'cover'
            }}>
              {/* <CardActionArea> */}
              <Stack
                style={{ marginTop: 10 }}
                alignItems="center"
              >
                <MyAvatar
                >MD</MyAvatar>
                {/* sx={{ bgcolor: deepOrange[500] }} */}
              </Stack>

              <CardContent>
                <Typography align={'center'} variant='h6' component="div">
                  黄地雷 &nbsp;  totoro
                </Typography>
                <Typography align={'left'} variant='subtitle2' component="div">
                  Huangzongliang@hotmail.com
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  爱好：易经，玄学，中医，占卜，风水，道教，游泳
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {'关于我：一个爱好研究传统文化的人。'}
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



