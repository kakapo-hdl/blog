// import { Footer } from "antd/lib/layout/layout";
import React from "react";
import { Box, Container, Grid } from "@material-ui/core";
import WriteArticle from "../components/WritArticle/WriteArticle";



export interface WriteArticlePageProps {

}



const WriteArticlePage: React.FC<(WriteArticlePageProps)> = (props) => {
  return (
    <>
      <Container fixed maxWidth={'lg'} style={{ height: '100vh', paddingTop: 10 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={12}>
            <WriteArticle ></WriteArticle>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}


export default WriteArticlePage;



