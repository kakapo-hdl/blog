/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import ImageResizeEditing from '@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting';
import ImageResizeHandles from '@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import HtmlComment from '@ckeditor/ckeditor5-html-support/src/htmlcomment';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';

export default class ClassicEditor extends ClassicEditorBase { }


// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	SourceEditing,
	Font, 
	Highlight,
	FindAndReplace,
	CodeBlock,
	Underline,
	Strikethrough,
	Code,
	Subscript,
	Superscript,
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	CloudServices,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	TextTransformation,
	ImageInsert,
	ImageResizeEditing,
	ImageResizeHandles,
	RemoveFormat,
	Alignment
];

const fontColorConfig = {
	colors: [
		{
			color: 'hsl(0, 0%, 0%)',
			label: 'Black'
		},
		{
			color: 'hsl(0, 0%, 30%)',
			label: 'Dim grey'
		},
		{
			color: 'hsl(0, 0%, 60%)',
			label: 'Grey',

		},
		{
			color: 'hsl(0, 0%, 90%)',
			label: 'Light grey'
		},
		{
			color: 'hsl(0, 0%, 100%)',
			label: 'White',
		},
		{
			color: 'hsl(0, 75%, 60%)',
			label: 'Red'
		},
		{
			color: 'hsl(30, 75%, 60%)',
			label: 'Orange'
		},
		{
			color: 'hsl(60, 75%, 60%)',
			label: 'Yellow'
		},
		{
			color: 'hsl(90, 75%, 60%)',
			label: 'Light green'
		},
		{
			color: 'hsl(120, 75%, 60%)',
			label: 'Green'
		},
		{
			color: 'hsl(150, 75%, 60%)',
			label: 'Aquamarine'
		},
		{
			color: 'hsl(180, 75%, 60%)',
			label: 'Turquoise'
		},
		{
			color: 'hsl(210, 75%, 60%)',
			label: 'Light blue'
		},
		{
			color: 'hsl(240, 75%, 60%)',
			label: 'Blue'
		},
		{
			color: 'hsl(270, 75%, 60%)',
			label: 'Purple'
		}
	]
};
const fontBackgroundColorConfig = {
	colors: [
		{
			color: 'hsl(0, 0%, 0%)',
			label: 'Black'
		},
		{
			color: 'hsl(0, 0%, 30%)',
			label: 'Dim grey'
		},
		{
			color: 'hsl(0, 0%, 60%)',
			label: 'Grey'
		},
		{
			color: 'hsl(0, 0%, 90%)',
			label: 'Light grey'
		},
		{
			color: 'hsl(0, 0%, 100%)',
			label: 'White',
			hasBorder: true
		},
		{
			color: 'hsl(0, 75%, 60%)',
			label: 'Red'
		},
		{
			color: 'hsl(30, 75%, 60%)',
			label: 'Orange'
		},
		{
			color: 'hsl(60, 75%, 60%)',
			label: 'Yellow'
		},
		{
			color: 'hsl(90, 75%, 60%)',
			label: 'Light green'
		},
		{
			color: 'hsl(120, 75%, 60%)',
			label: 'Green'
		},
		{
			color: 'hsl(150, 75%, 60%)',
			label: 'Aquamarine'
		},
		{
			color: 'hsl(180, 75%, 60%)',
			label: 'Turquoise'
		},
		{
			color: 'hsl(210, 75%, 60%)',
			label: 'Light blue'
		},
		{
			color: 'hsl(240, 75%, 60%)',
			label: 'Blue'
		},
		{
			color: 'hsl(270, 75%, 60%)',
			label: 'Purple'
		}
	]
};

const highlight = {
	options: [
		{ model: 'yellowMarker', class: 'marker-yellow', title: 'Yellow Marker', color: 'var(--ck-highlight-marker-yellow)', type: 'marker' },
		{ model: 'greenMarker', class: 'marker-green', title: 'Green marker', color: 'var(--ck-highlight-marker-green)', type: 'marker' },
		{ model: 'pinkMarker', class: 'marker-pink', title: 'Pink marker', color: 'var(--ck-highlight-marker-pink)', type: 'marker' },
		{ model: 'blueMarker', class: 'marker-blue', title: 'Blue marker', color: 'var(--ck-highlight-marker-blue)', type: 'marker' },
		{ model: 'redPen', class: 'pen-red', title: 'Red pen', color: 'var(--ck-highlight-pen-red)', type: 'pen' },
		{ model: 'greenPen', class: 'pen-green', title: 'Green pen', color: 'var(--ck-highlight-pen-green)', type: 'pen' }
	]
}

const fontSize = {
	options: [
		9,
		11,
		13,
		'default',
		17,
		19,
		21
	]
}

const fontFamily = {
	options: [
		'default',
		'Arial, Helvetica, sans-serif',
		'Courier New, Courier, monospace',
		'Georgia, serif',
		'Lucida Sans Unicode, Lucida Grande, sans-serif',
		'Tahoma, Geneva, sans-serif',
		'Times New Roman, Times, serif',
		'Trebuchet MS, Helvetica, sans-serif',
		'Verdana, Geneva, sans-serif']
}
const image = {
	toolbar: [
		'imageStyle:inline',
		'imageStyle:block',
		'imageStyle:side',
		'|',
		'toggleImageCaption',
		'imageTextAlternative'
	]
}

const table = {
	contentToolbar: [
		'tableColumn',
		'tableRow',
		'mergeTableCells'
	]
}
const alignment = {
	options: [
		{ name: 'left', className: 'my-align-left' },
		{ name: 'center', className: 'my-align-center' },
		{ name: 'right', className: 'my-align-right' }
	]
}
// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
			'|',
			'bold',
			'italic',
			'link',
			'Underline',
			'Strikethrough',
			'code',
			'subscript',
			'codeBlock',
			'superscript',
			'bulletedList',
			'numberedList',
			'blockQuote',
			'|',
			'outdent',
			'indent',
			'|',
			'ImageInsert',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo',
			'findAndReplace',
			'highlight',
			'removeFormat',
			'alignment',
			'sourceEditing',
			 'font'
		]
	},
	alignment,
  fontColorConfig,
	fontBackgroundColorConfig,
	language: 'en'
	// This value must be kept in sync with the language defined in webpack.config.js.

};
