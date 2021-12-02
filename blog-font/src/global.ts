import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
/* body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,p,blockquote,th,td { margin:0; padding:0; } */
html{
  font-size:14px;
  scroll-behavior: smooth;

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
.image {
    display: table;
    clear: both;
    text-align: center;
    margin: .9em auto;
    min-width: 50px;
}
.image-style-side {
    float: right;
    margin-left: var(--ck-image-style-spacing);
    max-width: 50%;
}
img { 
  border:none; 
  /* width:100% */
}
.imageLayer__207N-{
  -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-clip-path 350ms cubic-bezier(0.6, 0, 0.1, 1);
    transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-clip-path 350ms cubic-bezier(0.6, 0, 0.1, 1);
    transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), clip-path 350ms cubic-bezier(0.6, 0, 0.1, 1);
    transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), clip-path 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-clip-path 350ms cubic-bezier(0.6, 0, 0.1, 1);
    position: absolute;
    left: 50%;
    top: 50%;
    will-change: transform, top, opacity, clip-path;
}

.show__1tLY6 {
    opacity: 0.8 !important;
    -webkit-transform: translateX(0) !important;
    transform: translateX(0) !important;
}
.controls__3BU3E  {
    box-sizing: border-box;
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    opacity: 0;
    display: -webkit-box;
    display: flex;
    z-index: 1000;
    border-radius: 5rem;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    -webkit-transition: opacity 350ms, -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);
    transition: opacity 350ms, -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);
    transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms;
    transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms, -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);
}

.wrapperLayer__25Osd{
  position: fixed;
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

}
.backgroundLayer__L59ju{
  position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: -webkit-zoom-out;
    cursor: zoom-out;
    background-color: #ffffff;
    -webkit-transition: opacity 0.2s;
    transition: opacity 0.2s;
    will-change: opacity;
    -webkit-tap-highlight-color: transparent;
}
/* h1, h2, h3, h4, h5, h6 { font-weight:normal; font-size:100%; } */

/* address, caption, cite, code, dfn, em, strong, th, var { font-style:normal; font-weight:normal;} */

/* a { color:#555; text-decoration:none; }

a:hover { 
  text-decoration:underline; 
}



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