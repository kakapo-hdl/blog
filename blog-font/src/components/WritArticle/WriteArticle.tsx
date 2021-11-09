import { CardActionArea, CardContent, TextField, Typography } from "@material-ui/core";
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

// 富文本编辑器配置
const ckEditorConfig = {
  language: 'zh-cn',
  // 工具栏设置
  toolbar: {
    items: [
      // 标题 加粗 斜体 撤销 重做 超链接 项目符号列表 项目编号列表
      'heading',
      '|',
      'bold',
      'italic',
      'undo',
      'redo',
      'link',
      'bulletedList',
      'numberedList',
      // 插入表格 块引用
      '|',
      'insertTable',
      'blockQuote',
      // 插入图像 更改图片替换文本 图片通栏显示 图片侧边显示
      '|',
      'imageUpload',
      'imageTextAlternative',
      'imageStyle:full',
      'imageStyle:side',
    ],
    // 工具栏自动换行
    shouldNotGroupWhenFull: false,
  },
  // 标题样式
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
      { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },

    ],
  },
  // 表格样式
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  // upload
  ckfinder: {
    uploadUrl: '/图片上传服务器地址',
  },
};

const WriteArticle = () => {
  // 当设置 value 状态时，添加初始化值。
  const [article, setArticle] = useState<Article>({})
  const params: any = useParams();
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      const response = await getArticleById(params.id);
      setArticle(response.data);
    }
    fetchData();
  }, [])

  return (
    <>
      <div className="App">
          <Formik
            enableReinitialize 
            initialValues={article}
            onSubmit={async (values, { setSubmitting }) => {
              if(values.id){
                const res = await updateArticle(values);
              }else{
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
                  id="title"
                  name="title"
                  label="Title"
                  value={values.title}
                  onChange={handleChange}
                  size="medium"
                  error={Boolean(errors.title)}
                // helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  fullWidth
                  id="author"
                  name="author"
                  label="Author"
                  value={values.author}
                  onChange={handleChange}
                  size="medium"
                  error={Boolean(errors.author)}
                // helperText={formik.touched.email && formik.errors.email}
                />
                <CKEditor
                  config={ckEditorConfig}
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
                <button type="submit">
                  Submit
                </button>
              </form>
            )}
          </Formik>
          {/* : null} */}

      </div >
    </>
  )
}

export default WriteArticle; 
