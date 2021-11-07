// import { Footer } from "antd/lib/layout/layout";
import React, { Suspense } from "react";
import { Header, HeadConetnt } from "../components/Header/HeaderStyles"
import { Box, Container, Grid } from "@material-ui/core";
import Carousel from "../components/Crousel/Crousel";
import NavBar from "../components/Header/Header";
import { Home } from "@material-ui/icons";
import App from "../routers";



export interface IndexPageProps {

}



const IndexPage: React.FC<(IndexPageProps)> = (props) => {
  return (
    <>
      <NavBar></NavBar>
      <Suspense fallback={<div>Loading... </div>}>
        <App></App>
      </Suspense>


    </>
  )
}

export default IndexPage;



