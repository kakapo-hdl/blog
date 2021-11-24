import { Container, Grid, TextField, Typography } from "@material-ui/core";
import React, { useMemo, useRef, useState } from "react";
// TypeScript users only add this code
import { useEffect } from "react";
import { useParams } from "react-router";
import { getArticleById } from "../api/service";
import { Article } from "../models/model";
import moment from "moment";
import { Card } from "@mui/material";
import styled from "styled-components";
import { Catalogue } from "./Style";
import Paper from '@mui/material/Paper';




const ArticleDisplay = () => {
  const [article, setArticle] = useState<Article>({})
  const [catalogue, setCatalogue] = useState<Array<Element>>([])

  const params: any = useParams();
  const ckeditor = useRef() as React.RefObject<HTMLDivElement>


  useEffect(() => {
    fetchMap();

  }, [])

  useEffect(() => {
    const articleTags = ckeditor.current?.querySelectorAll('h2,h3,h4');
    if (articleTags?.length! > 0) {
      let catalogues: any[] = []
      articleTags?.forEach((item, index) => {
        let idValue = `/${item.tagName.toLowerCase()}-${item.textContent?.replace(' ', '')}`
        item.setAttribute('id', idValue)
        catalogues.push(
          <Typography key={index} component={'h6'} variant='h6' >
            <Catalogue href={`#${idValue}`} id={`#${idValue}`} className={`catalog-${item.tagName.toLowerCase()}`}>{item.textContent}</Catalogue>
          </Typography >
        )
      });
      setCatalogue(catalogues);

    }
  }, [article])

  useEffect(() => {
    if (catalogue.length !== 0)
      window.addEventListener('scroll', catalogTrack)

  }, [catalogue])

  const fetchMap = async () => {
    const res = await getArticleById(params.key);
    setArticle(res.data)
  }
  const catalogTrack = () => {
    const articleTags = ckeditor.current?.querySelectorAll('h2,h3,h4');
    articleTags?.forEach((item, index) => {
      if (item.getBoundingClientRect().top < 10) {
        let idValue = `#/${item.tagName.toLowerCase()}-${item.textContent?.replace(' ', '')}`
        let element = document.getElementById(idValue);
        let pre: any = document.getElementsByClassName('actvie-item');
        for (let item of pre) {
          item.classList.remove('actvie-item')
        }
        element!.classList.add('actvie-item');
      }
    });
  };
  return (
    <>
      {/* xs, extra-small:F 0px
sm, small: 600px
md, medium: 900px
lg, large: 1200px
xl, extra-large: 1536px */}
      <Container fixed maxWidth={'lg'} style={{ height: '100vh', padding: 0 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Card style={{ padding: '30px 25px' }}>
              <Typography variant="h4" component={'h4'}> {article.title}</Typography>
              <Typography variant='subtitle2' component={'time'}>
                {moment(article.createTime).format('YYYY-MM-DD HH:mm')}
              </Typography>
              <div />
              <Typography ref={ckeditor} dangerouslySetInnerHTML={{ __html: (article.content ? article.content : '') }} variant={'body1'} component={'div'} >
              </Typography>
            </Card>
          </Grid>
          <Grid item zeroMinWidth={true} xs={'auto'} md={3}>
            <Card style={{ position: 'sticky', top: 10, padding: '2px 4px' }}>
              <Typography variant="h5" style={{ color: '#918E8E', fontWeight: 700, paddingLeft: '0.8rem' }} component={'h6'}>目录</Typography>
              {catalogue}
            </Card>
          </Grid>

        </Grid>
      </Container >


    </>
  )
}

export default ArticleDisplay; 
