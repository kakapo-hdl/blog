// import { Footer } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { Container, Grid, Card, Avatar } from "@material-ui/core";
import Chip from '@mui/material/Chip';
import Carousel from "../components/Crousel/Crousel";
import ListArticle from "../components/ListArticle/ListArticle";
import { getCarouselArticle, getPerson } from "../api/service";
import { Article, PersonProf } from "../models/model";
import { Button, CardActionArea, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { deepOrange, deepPurple } from '@mui/material/colors';
import { MyAvatar } from "./Style";


export interface HomePageProps {

}



const HomePage: React.FC<(HomePageProps)> = (props) => {
  const [imgsUrl, setImgsUrl] = React.useState<string[]>([])
  const [articles, setArticles] = React.useState<Article[]>([])
  const [person, setPerson] = React.useState<PersonProf>({ nameEng: '', age: '', email: '', sex: '', nameChi: '', description: '', hobit: '', });

  useEffect(() => {
    async function fetchData() {
      const data = await getPerson();
      if (data.status === 200) {
        const personData = data.data as PersonProf;
        setPerson(personData);
      }

      const response = await getCarouselArticle();
      if (response.status === 200) {
        const { Articles, CrouselArticles } = response.data as { Articles: Article[], CrouselArticles: Article[] };
        const urls: string[] = []
        CrouselArticles.forEach(item => urls.push(item.imageUrl!))
        setImgsUrl(urls);
        setArticles(Articles);

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
                src={person.avaterUrl}
                >MD</MyAvatar>
                {/* sx={{ bgcolor: deepOrange[500] }} */}
              </Stack>

              <CardContent>
                <Typography align={'center'} variant='h6' component="div">
                  {person.nameChi} &nbsp;  {person.nameEng}
                </Typography>
                <Typography style={{marginTop:10}}  align={'left'} variant='subtitle2' component="div">
                  {person.email}
                </Typography>

                {/* <Typography variant="subtitle2" color="text.secondary"> */}
                <Stack style={{marginTop:10}}  flexWrap={'wrap'} direction="row" spacing={1}>
                <label htmlFor="icon-button-file">爱好：</label>
                {person.hobits ? person.hobits.map((element: string, index: number) => {
                  return (
                    <Chip size={'small'} style={{
                      border: '1px solid rgba(46, 125, 50, 0.7)',
                      borderRadius:16
                    }} label={element} color="success" variant="outlined" />
                  )
                }) : null}
              </Stack>
                {/* </Typography> */}
                <Typography style={{marginTop:10}} variant="subtitle2" color="text.secondary">
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



