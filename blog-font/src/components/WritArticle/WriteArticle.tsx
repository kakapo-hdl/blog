import { CardActionArea, CardContent, CircularProgress, TextField, Typography } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { ListCard } from "./Style";
// TypeScript users only add this code
import { BaseEditor, createEditor, Descendant } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik } from 'formik';
import { useEffect } from "react";
import { getArticleById, insertArticle, updateArticle } from "../../api/service";
import { useHistory, useParams } from "react-router";
import { Article, Message } from "../../models/model";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import axios from "axios";
import { MyCustomUploadAdapterPlugin } from "./upload";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ckEditorConfig = {
  language: 'zh-cn',
  toolbar: {
    // items: [
    //   // 标题 加粗 斜体 撤销 重做 超链接 项目符号列表 项目编号列表
    //   'heading',
    //   '|',
    //   'bold',
    //   'italic',
    //   'undo',
    //   'redo',
    //   'link',
    //   'bulletedList',
    //   'numberedList',
    //   // 插入表格 块引用
    //   '|',
    //   'insertTable',
    //   // 插入图像 更改图片替换文本 图片通栏显示 图片侧边显示
    //   '|',
    //   'imageUpload',
    // ],
    // 工具栏自动换行
    shouldNotGroupWhenFull: true,
  },
  extraPlugins: [MyCustomUploadAdapterPlugin],
};


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

  const showMessage = (mes: Message) => {
    mes.key = new Date().getTime().toString();
    setMessage(mes);
  }
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

            } else {
              try {
                showMessage({ message: 'submitting...', type: 'info', isLoading: true });
                const res = await insertArticle(values)
                setArticle(res.data.data)
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
                  shrink: false,
                }}
                error={Boolean(errors.title)}
              />
              <br></br>
              <br></br>

              <TextField
                style={{width:'38%',marginRight:'2%'}}
                variant="outlined"
                id="author"
                name="author"
                label="Author"
                value={values.author}
                onChange={handleChange}
                // InputLabelProps={{
                //   shrink: true,
                // }}
                size="medium"
                error={Boolean(errors.author)}
              />

  
              <FormControl  style={{width:'60%'}} >
                <InputLabel id="articleType">article type</InputLabel>
                <Select
                  labelId="articleType"
                  name="articleType"
                  id="articleType"
                  value={values.ArticleTypeId}
                  label="article type"
                  onChange={handleChange}
                  size="medium"
                  
                // InputLabelProps={{
                //   shrink: true,
                // }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>



              <br></br>
              <br></br>

              <CKEditor
                config={ckEditorConfig}
                editor={ClassicEditor}
                data={values.content}
                onReady={(editor: any) => {
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
