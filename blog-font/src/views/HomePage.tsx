// import { Footer } from "antd/lib/layout/layout";
import React from "react";
import { Header, HeadConetnt } from "../components/Header/HeaderStyles"
import { Box, Container, Grid } from "@material-ui/core";
import Carousel from "../components/Crousel/Crousel";
import ListArticle from "../components/ListArticle/ListArticle";



export interface HomePageProps {

}



const HomePage: React.FC<(HomePageProps)> = (props) => {
  return (
    <>
      <Container fixed maxWidth={'lg'} style={{ height: '100vh', paddingTop: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={9} md={9}>
            <div style={{ height: 'calc(50vh)', width: "100%", marginBottom: 10 }}>
              <Carousel></Carousel>
            </div>
            <ListArticle></ListArticle>
          </Grid>
          <Grid item xs={3} md={3}>

          </Grid>
        </Grid>
      </Container>
    </>
  )
}


export default HomePage;



