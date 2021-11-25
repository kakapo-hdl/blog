// import { Footer } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import Carousel from "../components/Crousel/Crousel";
import ListArticle from "../components/ListArticle/ListArticle";
import { getCarouselArticle } from "../api/service";
import { Article } from "../models/model";



export interface HomePageProps {

}



const HomePage: React.FC<(HomePageProps)> = (props) => {
  const [imgsUrl,setImgsUrl] = React.useState<string[]>([])
  const [articles,setArticles] =  React.useState<Article[]>([])
  useEffect(()=>{
    async function fetchData() {
      // You can await here
      const response = await getCarouselArticle();
      if(response.status === 200){
        const {Articles,CrouselArticles} = response.data as {Articles: Article[],CrouselArticles: Article[] } ;
        const urls: string[] = []
        Articles.forEach(item=>urls.push(item.imageUrl!))
        setImgsUrl(urls);
        setArticles(CrouselArticles);

      }
      // ...
    }
    fetchData();
  },[])
  return (
    <>
      <Container fixed maxWidth={'lg'} style={{ height: '100vh', paddingTop: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={9} md={9}>
            <div style={{ height: 'calc(50vh)', width: "100%", marginBottom: 10 }}>
              <Carousel switchTime={4000} imageUrl={imgsUrl}></Carousel>
            </div>
            <ListArticle articles={articles} ></ListArticle>
          </Grid>
          <Grid item xs={3} md={3}>

          </Grid>
        </Grid>
      </Container>
    </>
  )
}


export default HomePage;



