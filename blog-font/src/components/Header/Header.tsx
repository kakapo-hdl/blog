import React, { useRef } from "react";
import { HeadConetnt, Header } from "./HeaderStyles";

export interface NavBarProps {

}

const NavBar: React.FC<(NavBarProps)> = (props) => {
  return (
    <>
      <HeadConetnt>
        <Header>Header</Header>
      </HeadConetnt>
    </>
  )
}

export default NavBar;