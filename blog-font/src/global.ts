import {createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle`
/* body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,p,blockquote,th,td { margin:0; padding:0; } */
html{
  font-size:14px
}
body { background:#F4F5F5; color:#555; font-size:1rem; font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif; }

td,th,caption { font-size:14px; }
blockquote {
    overflow: hidden;
    padding-right: 1.5em;
    padding-left: 1.5em;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    border-left: 5px solid #ccc;
}


img { border:none; width:100% } 
/* h1, h2, h3, h4, h5, h6 { font-weight:normal; font-size:100%; } */

/* address, caption, cite, code, dfn, em, strong, th, var { font-style:normal; font-weight:normal;} */

/* a { color:#555; text-decoration:none; }

a:hover { text-decoration:underline; }



/* ol,ul,li { list-style:none; } */

/* input, textarea, select, button { font:14px "Arial","Microsoft YaHei","黑体","宋体",sans-serif; }

table { border-collapse:collapse; }

html {overflow-y: scroll;}

.clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}

.clearfix { *zoom:1; } */

/*公共类*/

 /* .fl { float:left}

.fr {float:right}

.al {text-align:left}

.ac {text-align:center}

.ar {text-align:right}

.hide {display:none} */
.MuiAlert-message{
  width: 100% !important;
}

.ck-content{
  min-height: 500px !important;
}
.catalog-h2 {
	padding-left: 0.8rem;
}
.catalog-h3 {
	padding-left: 1.6rem;
}
.catalog-h4 {
	padding-left: 2.4rem;
}
.catalog-h5 {
	margin-left: 4em;
}
.catalog-h6 {
	margin-left: 5em;
}
.actvie-item {
  border-left: 2px solid rgb(165, 216, 255) !important;
  color: #007FFF !important;
}
`

export default GlobalStyle;