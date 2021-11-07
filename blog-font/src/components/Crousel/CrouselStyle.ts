
import styled from "styled-components";

interface props {
  leftWidth: string,
  translat: string,
  transitionTime:string
}
export const CrouSelContain = styled.ul`
 position: relative;
  width: 100%;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #eee;
  overflow: hidden;
`
export const CrouSelItem = styled.li`
  margin: 0;
  padding: 0;
  width: inherit;
  height: inherit;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica;
  font-size: 120px;
  color: #fff;
  left: ${(props: props) => props.leftWidth};
  transform: translate(${(props: props) => props.translat}%);
  transition: ${(props: props) => props.transitionTime}s transform   ease-in-out;  
  > img{
    width:100%;
    height:100%;
    transition: all 1s;
    object-fit: cover;

    :hover{
      transform: scale(1.1);
    }
  }
  `

export const BackShadow = styled.div`
height: 30%;
width: 100%;
position: absolute;
bottom: 0;
z-index:1;
background: linear-gradient(to top,#000000ad,#ffffff05)
`

export const CrouselIcon = styled.div`
   position: absolute;
   bottom: 0;
   text-align: center;
   z-index: 2;
   /* z-index: 9; */
   width: 100%;
`