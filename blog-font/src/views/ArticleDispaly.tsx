import { CardActionArea, CardContent, CircularProgress, Container, Grid, TextField, Typography } from "@material-ui/core";
import React, { useMemo, useState } from "react";
// TypeScript users only add this code
import { BaseEditor, createEditor, Descendant } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik } from 'formik';
import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getArticleById } from "../api/service";
import { Article } from "../models/model";
import moment from "moment";





const ArticleDispaly = () => {
  const [article, setArticle] = useState<Article>({})
  const params: any = useParams();
  useEffect(() => {
    fetchMap();
  },[])
  const fetchMap = async () => {
    const res = await getArticleById(params.key);
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
            <div  />
            <Typography dangerouslySetInnerHTML={{__html: (article.content? article.content : '')}} variant={'body1'} component={'html'} >
           
       </Typography>

          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ArticleDispaly; 
