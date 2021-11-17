import { CardActionArea, CardContent, CircularProgress, TextField, Typography } from "@material-ui/core";
import React, { useContext, useMemo, useState } from "react";
import { ListCard } from "./Style";
// TypeScript users only add this code
import { BaseEditor, createEditor, Descendant } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik } from 'formik';
import { useEffect } from "react";
import { getArticleById, getArticleTypeMap, insertArticle, updateArticle } from "../../api/service";
import { useHistory, useParams } from "react-router";
import { Article, Message } from "../../models/model";
import Button from '@mui/material/Button';
import { MyCustomUploadAdapterPlugin } from "./upload";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { GrobalContext } from "../../views/IndexPage";

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
  mediaEmbed: {
    previewsInData: true
  },
  extraPlugins: [MyCustomUploadAdapterPlugin],
};



const WriteArticle = () => {
  const [article, setArticle] = useState<Article>({ title: '', author: '', content: '', articleTypeId: 0 })
  const [map, setMap] = React.useState<Array<{ id: number, value: string, color: string }>>();

  const   showMessage: (mes: Message)=>void =useContext(GrobalContext);

   
  const params: any = useParams();
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      showMessage({ message: 'loading data...', type: 'info', isLoading: true });
      const res = await getArticleById(params.key);
      if (res.status === 200)
        if (res.data.content === null) {
          res.data.content = ''
        }
      setArticle(res.data);
      showMessage({ message: 'loading success!', type: 'success', isLoading: false })
    }
    async function fetchMap() {
      const selectMap = await getArticleTypeMap();
      setMap(selectMap.data);

    }

    fetchMap();

    if (params.key === "create") {
    } else {
      fetchData();
    }

  }, [])

  return (
    <>
      <div className="App">
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
                console.log(values);

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
                // InputLabelProps={{
                //   shrink: true,
                // }}
                error={Boolean(errors.title)}
              />
              <br></br>
              <br></br>

              <TextField
                style={{ width: '38%', marginRight: '2%' }}
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


              <FormControl style={{ width: '60%' }} >
                <InputLabel id="articleTypeId">article type</InputLabel>
                <Select
                  labelId="articleTypeId"
                  name="articleTypeId"
                  id="articleTypeId"
                  value={values.articleTypeId}
                  label="article type"
                  onChange={handleChange}
                  size="medium"
                >
                  {map?.map(item => <MenuItem key={item.id} style={{ color: item.color }} value={item.id}>{item.value}</MenuItem>)}
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

              <Button variant='contained' color="primary" type="submit">
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
