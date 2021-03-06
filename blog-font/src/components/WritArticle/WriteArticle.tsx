import { TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik, FormikProps } from 'formik';
import { useEffect } from "react";
import { getArticleById, getArticleTypeMap, insertArticle, updateArticle } from "../../api/service";
import { useHistory, useParams } from "react-router";
import { Article, Message } from "../../models/model";
import Button from '@mui/material/Button';
import { MyCustomUploadAdapterPlugin } from "./upload";
import { IconButton, InputLabel, Link, MenuItem, Select } from "@mui/material";
import { GrobalContext } from "../../views/IndexPage";
import {  CopyrightSharp, PhotoCamera } from "@material-ui/icons";
import styled from "styled-components";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Zmage from 'react-zmage'

import FormLabel from '@mui/material/FormLabel';
// import ReactZmage from 'react-zmage';
const Input = styled('input')({
  display: 'none',
});
const ckEditorConfig = {
  language: 'zh-cn',
  toolbar: {
    // items: [
      // 'toggleImageCaption', 'imageTextAlternative'
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
    previewsInData: true,
		providers: [
			{
				name: 'dailymotion',
				url: /^dailymotion\.com\/video\/(\w+)/,
				html: (match:any) => {
					const id = match[1];
					return (
						'<div style="position: relative; padding-bottom: 100%; height: 0; ">' +
						`<iframe src="https://www.dailymotion.com/embed/video/${id}" ` +
						'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						'frameborder="0" width="480" height="270" allowfullscreen allow="autoplay">' +
						'</iframe>' +
						'</div>'
					);
				}
			},

			{
				name: 'spotify',
				url: [
					/^open\.spotify\.com\/(artist\/\w+)/,
					/^open\.spotify\.com\/(album\/\w+)/,
					/^open\.spotify\.com\/(track\/\w+)/
				],
				html: (match:any) => {
					const id = match[1];

					return (
						'<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 126%;">' +
						`<iframe src="https://open.spotify.com/embed/${id}" ` +
						'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						'frameborder="0" allowtransparency="true" allow="encrypted-media">' +
						'</iframe>' +
						'</div>'
					);
				}
			},

			{
				name: 'youtube',
				url: [
					/^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
					/^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
					/^youtube\.com\/embed\/([\w-]+)/,
					/^youtu\.be\/([\w-]+)/
				],
				html: (match:any) => {
					const id = match[1];          
					return (
						'<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
						`<iframe src="https://www.youtube.com/embed/${id}" ` +
						'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
						'</iframe>' +
						'</div>'
					);
				}
			},
			{
				name: 'bilibili',
				url:[
          /(?<=aid=).*?(?=&)/,
          /bilibili\.com.*/,
        ],
				html: (match:any) => {
					const id = match[0];     
               
					return (
            '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
						`<iframe src="https://player.bilibili.com/player.html?aid=${id}&page=1&as_wide=1&high_quality=1&danmaku=0" ` +
						'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
						'</iframe>' +
						'</div>'
					);
				}
			},

			{
				name: 'vimeo',
				url: [
					/^vimeo\.com\/(\d+)/,
					/^vimeo\.com\/[^/]+\/[^/]+\/video\/(\d+)/,
					/^vimeo\.com\/album\/[^/]+\/video\/(\d+)/,
					/^vimeo\.com\/channels\/[^/]+\/(\d+)/,
					/^vimeo\.com\/groups\/[^/]+\/videos\/(\d+)/,
					/^vimeo\.com\/ondemand\/[^/]+\/(\d+)/,
					/^player\.vimeo\.com\/video\/(\d+)/
				],
				html: (match:any) => {
					const id = match[1];
					return (
						'<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
						`<iframe src="https://player.vimeo.com/video/${id}" ` +
						'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						'frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>' +
						'</iframe>' +
						'</div>'
					);
				}
			},

			{
				name: 'instagram',
				url: /^instagram\.com\/p\/(\w+)/
			},
			{
				name: 'twitter',
				url: /^twitter\.com/
			},
			{
				name: 'googleMaps',
				url: /^google\.com\/maps/
			},
			{
				name: 'flickr',
				url: /^flickr\.com/
			},
			{
				name: 'facebook',
				url: /^facebook\.com/
			}
		]
	},
  extraPlugins: [MyCustomUploadAdapterPlugin],
};

export const useDebouncedEffect = (effect:any, deps:any, delay:any) => {
  useEffect(() => {
      const handler = setTimeout(() => effect(), delay);

      return () => clearTimeout(handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps || [], delay]);
}
const WriteArticle = () => {
  const [article, setArticle] = useState<Article>({ title: '', author: '', content: '', articleTypeId: 0, description: '', isCrouselArticle: false })
  const [map, setMap] = React.useState<Array<{ id: number, value: string, color: string }>>();
  const [image, setImage] = React.useState<File | null>();
  const [preUrl, setPreUrl] = React.useState<string>('');
  const [value, setValue] = useState()
  const myFormRef = React.useRef<FormikProps<any>>(null);

  useDebouncedEffect(() =>  myFormRef.current?.submitForm(), [value], 5000);

  const showMessage: (mes: Message) => void = useContext(GrobalContext);

  const params: any = useParams();
  const history = useHistory();

  // useEffect(()=>{
    
  // },[debounceText])
  useEffect(() => {
    async function fetchData() {
      showMessage({ message: 'loading data...', type: 'info', isLoading: true });
      const res = await getArticleById(params.key);
      if (res.status === 200) {
        const resData: Article = res.data
        if (resData.content === null) {
          resData.content = ''
        } if (resData.imageUrl) {
          setPreUrl(resData.imageUrl)
        }
        setArticle(resData);
        showMessage({ message: 'loading success!', type: 'success', isLoading: false })
      }

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
  const fileHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length !== 0 && files !== null) {
      const file = e.target.files![0];
      setImage(file);
      const reader = new FileReader();
      reader.onload = event => {
        if (typeof event.target!.result === 'string')
          setPreUrl(event.target!.result)
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <>
      {/* <div> */}
        <Formik
        innerRef={myFormRef}

          enableReinitialize
          initialValues={article}
          onSubmit={async (values: any, { setSubmitting }) => {
            const formData = new FormData();
            Object.keys(values).forEach((key: any) => formData.append(key, values[key]));
            if (image) {
              formData.append('image', image!);
            }

            if (values.id) {
              try {
                showMessage({ message: 'updating...', type: 'info', isLoading: true })
                await updateArticle(formData);
                showMessage({ message: 'update success!', type: 'success', isLoading: false })
              } catch (error) {
                showMessage({ message: 'update fail', type: 'error', isLoading: false })
              }
            } else {
              try {
                showMessage({ message: 'submitting...', type: 'info', isLoading: true });
                const res = await insertArticle(formData)
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
            setFieldValue,
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


              <FormControl size="small" component="fieldset" style={{ width: '60%' }} >
                <InputLabel id="articleTypeId">article type</InputLabel>
                <Select
                  labelId="articleTypeId"
                  name="articleTypeId"
                  id="articleTypeId"
                  value={values.articleTypeId}
                  label="article type"
                  onChange={handleChange}
                  size="small"
                >
                  {map?.map(item => <MenuItem key={item.id} style={{ color: item.color }} value={item.id}>{item.value}</MenuItem>)}
                </Select>
              </FormControl>
              <br></br>
              <br></br>

              <TextField
                style={{ width: '80%' }}
                variant="outlined"
                id="description"
                name="description"
                label="description"
                value={values.description}
                onChange={handleChange}
                multiline
                minRows={3}
                size="medium"
                error={Boolean(errors.title)}
              />
   
              <IconButton size='large' onClick={async ()=>{
                let selecter=window.getSelection()?.toString();
              if(typeof selecter === 'string')
              setFieldValue('description',selecter.trim())
              }} color="primary" aria-label="upload picture" component="span">
                <CopyrightSharp fontSize="medium"  />          
                 复制
              </IconButton>
              <br></br>
              <br></br>

              <FormControl component="fieldset" >
                <FormLabel id="isCrouselArticle" component="legend">As Crousel Article</FormLabel>
                <RadioGroup
                  itemType="success"
                  name="isCrouselArticle" id="isCrouselArticle"
                  value={values.isCrouselArticle}
                  onChange={handleChange}
                  row
                  Faria-label="gender" >
                  <FormControlLabel value={true} control={<Radio />} label="Yes" />
                  <FormControlLabel value={false} control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>

              <label htmlFor="icon-button-file" >
                <Input accept="image/*" onChange={(e) => { fileHandleChange(e) }} id="icon-button-file" type="file" />
                <IconButton size='large' color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
                <Link style={{ cursor: 'pointer' }} > {image?.name} </Link>
              </label>

              {preUrl ? <Zmage
              //  style={{width:100,height:100}} 
                src={preUrl} /> : null}


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
                  values.content = data;                  
                  setValue(data);
                }}
              />
              <br></br>

              <Button variant='contained' color="primary" type="submit">
                {values.id === undefined ? "Submit" : "Update"}
              </Button>
            </form>
          )}
        </Formik>
      {/* </div > */}
    </>
  )
}

export default WriteArticle; 
