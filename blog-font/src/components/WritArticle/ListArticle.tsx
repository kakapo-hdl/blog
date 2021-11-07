<<<<<<< HEAD:blog-font/src/components/WritArticle/ListArticle.tsx
import { CardActionArea, CardContent, Typography } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { ListCard } from "./Style";
// TypeScript users only add this code
import { BaseEditor, createEditor, Descendant } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
import { useEffect } from "react";

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}
function MyCustomUploadAdapterPlugin( editor: any ) {
  // editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
  //   // 第二个参数设置上传图片的地址
  //   return new MyUploadAdapter( loader, 'url***' );
  // };
}

const WriteArticle = () => {
  // 当设置 value 状态时，添加初始化值。
  const [value, setValue] = useState<string>('')


  useEffect(()=>{
    ClassicEditor
    .create( document.querySelector( '#editor' ),{
      image: {
        toolbar: [
          'imageTextAlternative', '|',
          'imageStyle:alignLeft',
          'imageStyle:full',
          'imageStyle:alignRight'
        ],
        styles: [
          'full',
          'alignLeft',
          'alignRight'
        ]
      },
      extraPlugins: [ MyCustomUploadAdapterPlugin ]   // 添加上传适配器
    })
    // .then( editor => {} )
    // .catch( error => {} );
})


  return (
    <><div className="App">
      <h2>Using CKEditor 4 in React</h2>

      <div dangerouslySetInnerHTML={{ __html: value }} />
      <CKEditor
        config={{ ckfinder: {
          // 請於此處設定上傳圖片之 API 路由
          language: 'zh-cn',  // 设置中文
          uploadUrl: '/1/content/image',
          fontSize: {options: [10,12,14,16,18,20,24]},

        } }}
        editor={ClassicEditor}
        data={value}
        onReady={(editor: any) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          setValue(data);

        }}
        // onBlur={(event, editor) => {
        //   console.log('Blur.', editor);
        // }}
        // onFocus={(event, editor) => {
        //   console.log('Focus.', editor);
        // }}
      />
    </div >
    </>
  )
}

=======
import { CardActionArea, CardContent, Typography } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { ListCard } from "./Style";
// TypeScript users only add this code
import { BaseEditor, createEditor, Descendant } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';

import Image from '@ckeditor/ckeditor5-image/src/image';
import { useEffect } from "react";

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
  const [value, setValue] = useState<string>('')


  useEffect(()=>{
  //   ClassicEditor.create( document.querySelector( '#editor' ), {
  //     plugins: [ Image],
  // } 
  // )

  })


  return (
    <><div className="App">
      <h2>Using CKEditor 4 in React</h2>

      <div dangerouslySetInnerHTML={{ __html: value }} />
      <CKEditor
        config={ckEditorConfig}
        editor={ClassicEditor}
        data={value}
        onReady={(editor: any) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          setValue(data);

        }}
        // onBlur={(event, editor) => {
        //   console.log('Blur.', editor);
        // }}
        // onFocus={(event, editor) => {
        //   console.log('Focus.', editor);
        // }}
      />
    </div >
    </>
  )
}

>>>>>>> d6f3c2aa59b179e06c25eff6c3a8c9d9bb70af11:blog-font-end/src/components/WritArticle/ListArticle.tsx
export default WriteArticle;