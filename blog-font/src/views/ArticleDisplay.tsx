import {Container, Grid, TextField, Typography } from "@material-ui/core";
import React, { useMemo, useState } from "react";
// TypeScript users only add this code
import { useEffect } from "react";
import { useParams } from "react-router";
import { getArticleById } from "../api/service";
import { Article } from "../models/model";
import moment from "moment";
import ReactHtmlParser from '@types/react-html-parser';





const ArticleDisplay = () => {
  const [article, setArticle] = useState<Article>({})
  const params: any = useParams();
  useEffect(() => {
    fetchMap();
  }, [])

  useEffect(() => {
    fetchMap();
  }, [])
  const fetchMap = async () => {
    const res = await getArticleById(params.key);
    console.log(ReactHtmlParser(res.data.content));
    
    setArticle(res.data)
  }
  return (
    <>
      <Container fixed maxWidth={'lg'} style={{ height: '100vh', paddingTop: 10 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={12}>
            <Typography variant="h4" component={'h4'}> {article.title}</Typography>
            <Typography variant='subtitle2' component={'time'}>
              {moment(article.createTime).format('YYYY-MM-DD HH:mm')}
            </Typography>
            <div />
            <Typography dangerouslySetInnerHTML={{ __html: (article.content ? article.content : '') }} variant={'body1'} component={'div'} >

            </Typography>
            {/* <Typography dangerouslySetInnerHTML={{
              __html: `<div style="position: relative; padding: 30% 45%;">
                <iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?cid=145147963&aid=84267566&page=1&as_wide=1&high_quality=1&danmaku=0" frameborder="no" scrolling="no" ></iframe>
        </div>` }} variant={'body1'} component={'div'} /> */}

      </Grid>
    </Grid>
      </Container >
    </>
  )
}

export default ArticleDisplay; 
