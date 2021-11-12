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
import { Article, Message } from "../../models/model";
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
  const [message, setMessage] = React.useState<Message>({ time: 3000, message: '', type: 'info', isLoading: true, key: new Date().getTime().toString() });
  const handleClick = () => {
    setOpen(true);
  };

  const showMessage = (mes: Message) => {
    mes.key = new Date().getTime().toString();
    setMessage(mes);
  }

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
      showMessage({ message: 'loading data...', type: 'info', isLoading: true })
      setOpen(true)
      const res = await getArticleById(params.key);
      if (res.status === 200)
        setArticle(res.data);
      setOpen(true);
      showMessage({ message: 'loading success!', type: 'success', isLoading: false })
    }
    if (params.key === "create") {
    } else {
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
          }} open={open} autoHideDuration={message.time === undefined ? 3000 : message.time}
            key={message ? message.key : undefined}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity={message?.type} sx={{ width: '100%', minWidth: 300 }}>
              <span style={{ fontSize: '1rem' }}>{message?.message}</span> {message?.isLoading ? <CircularProgress style={{ float: "right" }} size={20} /> : null}
            </Alert>
          </Snackbar>

        </Stack>
        <Formik
          enableReinitialize
          initialValues={article}
          onSubmit={async (values, { setSubmitting }) => {
            if (values.id) {
              try {
                showMessage({ message: 'updating...', type: 'info', isLoading: true })
                await updateArticle(values);
                showMessage({ message: 'update success!', type: 'success', isLoading: false })
              } catch (error) {
                showMessage({ message: 'update fail', type: 'error', isLoading: false })
              }

              // if(res.status===200)  
            } else {
              try {
                showMessage({ message: 'submitting...', type: 'info', isLoading: true });
                const res = await insertArticle(values)
                // if (res.status===200) {
                setArticle(res.data.data)
                // if(res.status===200)   
                showMessage({ message: 'create success!', type: 'success', isLoading: false })
                history.push(`/writeArticle/${res.data.data.id}`);
              }
              catch (error) {
                showMessage({ message: 'create fail!', type: 'error', isLoading: false })
              }
            }
          }
        }
      
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
              {values.id === undefined ? "Submit" : "Update"}
            </Button>
          </form>
        )}
      </Formik>

    </div >
    </>
  )
}

export default WriteArticle; 
