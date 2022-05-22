import { Typography } from "@material-ui/core";
import { CloudCircle } from "@material-ui/icons";
import { Divider, ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import React, { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
// import { HeadConetnt, Header } from "./HeaderStyles";

export interface NavBarProps {

}
const menulist = [
  {
    key: "/Management/ActicleType",
    content: "文章類型"
  },

  {
    key: "/Management/ActicleManagement",
    content: "文章類型"
  },
  {
    key: "/Management/Profile",
    content: "個人資料"
  },
  {
    key: "/Management/Account",
    content: "賬戶信息"
  },


]
const Menu: React.FC<(NavBarProps)> = (props) => {
  const [menuKeys, setmenuKeys] = useState<[string]>()
  const location = useLocation()
  const history = useHistory()

  const path = location.pathname;
  return (
    <>
      <MenuList disabledItemsFocusable onClick={(e) => {
        console.log(e, 'e')
      }} style={{ border: "none" }} variant="selectedMenu">

        {menulist.map(item =>
          <MenuItem onClick={()=>{
            history.push(item.key)
          }} selected={path===item.key} action={(e) => {
            console.log(e)
          }} key={item.key} >
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText>{item.content}</ListItemText>
          </MenuItem>
        )}

        <Divider />
      </MenuList>
    </>
  )
}

export default Menu;