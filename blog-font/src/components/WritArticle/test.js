import { CardActionArea, CardContent, Typography } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { ListCard } from "./Style";
// TypeScript users only add this code
import { BaseEditor, createEditor, Descendant } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ExportWord from '@ckeditor/ckeditor5-export-word/src/exportword';
import Image from '@ckeditor/ckeditor5-image/src/image';

// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import { useEffect } from "react";


// }
function MyCustomUploadAdapterPlugin( editor ) {
  // editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
  //   // 第二个参数设置上传图片的地址
  //   return new MyUploadAdapter( loader, 'url***' );
  // };
}

const WriteArticle = () => {
  // 当设置 value 状态时，添加初始化值。
  const [value, setValue] = useState<string>('')


  useEffect(()=>{
    ClassicEditor.create( document.querySelector( '#editor' ), {
      plugins: [ Image],
  } )

  })
    // .then( ... )
    // .catch( ... );
    // )


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
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
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

export default WriteArticle;