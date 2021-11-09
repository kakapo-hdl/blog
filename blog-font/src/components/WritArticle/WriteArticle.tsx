import { CardActionArea, CardContent, CircularProgress, TextField, Typography } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { ListCard } from "./Style";
// TypeScript users only add this code
import { BaseEditor, createEditor, Descendant } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
import { Formik, FastField } from 'formik';
import { useEffect } from "react";
import { getArticle, getArticleById, insertArticle, updateArticle } from "../../api/service";
import { useHistory, useLocation, useParams } from "react-router";
import { Article } from "../../models/model";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { relative } from "path";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WriteArticle = () => {
  const [article, setArticle] = useState<Article>({})
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const params: any = useParams();
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      const res = await getArticleById(params.key);
      if (res.data !== "")
        setArticle(res.data);
    }   

    if(params.key==="create"){
    }else{
      fetchData();
    }
 
  }, [])

  return (
    <>
      <div className="App">

        <Stack spacing={3} sx={{ width: '100%' }}>

          <Snackbar anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }} open={open} autoHideDuration={60000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%', minWidth: 300 }}>
              <span style={{ fontSize: '1rem' }}>submitting...</span>  <CircularProgress style={{ float: "right" }} size={20} />
            </Alert>
          </Snackbar>

        </Stack>
        <Formik
          enableReinitialize
          initialValues={article}
          onSubmit={async (values, { setSubmitting }) => {
            if (values.id) {
              const res = await updateArticle(values);
            } else {
              const res = await insertArticle(values);
              history.push(`/writeArticle/${res.data.id}`);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                variant="outlined" 
                id="title"
                name="title"
                label="Title"
                value={values.title}
                onChange={handleChange}
                size="medium"
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errors.title)}
              />
                            <br></br>
                            <br></br>

              <TextField
                fullWidth
                variant="outlined" 
                id="author"
                name="author"
                label="Author"
                value={values.author}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                size="medium"
                error={Boolean(errors.author)}
                
              />
              <br></br>
              <br></br>
              <br></br>

              <CKEditor
                // config={ClassicEditor}
                editor={ClassicEditor}
                data={values.content}
                onReady={(editor: any) => {
                  // You can store the "editor" and use when it is needed.
                }}
                onChange={(event: any, editor: any) => {
                  const data = editor.getData();
                  values.content = data
                }}

              />
              <br></br>
              <Button variant='contained' color="primary" type="submit" onClick={handleClick}>
                Submit
              </Button>
            </form>
          )}
        </Formik>

      </div >
    </>
  )
}

export default WriteArticle; 
