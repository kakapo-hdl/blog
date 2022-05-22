import { Avatar } from "@mui/material";
import styled from "styled-components";

export const content = styled.body`
display: flex;
margin: 0 auto;
position: relative;
/* top:10px; */
height: 64px;
background-color: #fff;
padding:0 20px;
/* border-bottom: 1px solid; */
box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
`

export const Catalogue = styled.a`
text-decoration: none;
color: #202020;
font-weight: 700 ;
font-size: 1rem;
box-sizing: border-box;
border-left: 2px solid #fff;
text-decoration: none;
display: inline-flex;
-webkit-box-align: center;
align-items: center;
    /* padding: 0px 8px 0px 10px; */
margin: 4px 0px 8px;
box-sizing: border-box;
:hover{
  border-left: 2px solid rgb(165, 216, 255);
  color: #007FFF;

}
`
export const MyAvatar = styled(Avatar)`
  height: 90px;
  width: 90px;
  /* transition: transform 2s ease-in-out; */
  animation-delay:1s;
  animation:myfirst 10s;
  animation-direction: reverse;

  animation-iteration-count:infinite;
  @keyframes myfirst
{
  0% {
    transform: rotateZ(0deg) scale(1);
    }
	50% {
    transform: rotateZ(360deg) scale(1.2);
    }
    100% {
      transform: rotateZ(720deg) scale(1);
    }
}
`

export const Contanter = styled.div`
  height:100vh;
  min-height:100vh ;
  width:100%;
`
export const Header = styled.div`
  display:flex ;
  height:70px ;
  width:100%;
`

export const ContanterMain = styled.div`
display: flex ;
height:calc(100% - 70px);
flex-direction: row;
`

export const MenuLeft = styled.div`
height:100% ;
width:300px;
`

export const ContaintRight = styled.div`
  width:100%;

`


