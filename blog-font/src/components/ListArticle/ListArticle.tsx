import { CardActionArea, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { ListCard } from "./ComponentStyle";
export interface Props {
  // name?: String;
  // enthusiasmLevel: number;
  // onIncrement?: () => void;
  // onDecrement?: () => void;
}
const mokData = [
  {
    title: "太上老君常说清静经",
    time: "2021-09-30",
    content: "关于太上老君常说清静经关于太上老君常说清静经关于太上老君常说清静经关于太上老君常说清静经",
  },
  {
    title: "太上老君常说清静经2",
    time: "2021-09-29",
    content: "关于太上老4君常说清静经关于太上老君常说清静经关于太上老君常说清静经关于太上老君常说清静经",
  },
  {
    title: "太上老君常说清静经",
    time: "2021-09-30",
    content: "关于太上老君常说清静经关于太上老君常说清静经关于太上老君常说清静经关于太上老君常说清静经",
  },
  {
    title: "太上老君常说清静经2",
    time: "2021-09-29",
    content: "关于太上老4君常说清静经关于太上老君常说清静经关于太上老君常说清静经关于太上老君常说清静经",
  },
  {
    title: "太上老君常说清静经",
    time: "2021-09-30",
    content: "关于太上老君常说清静经关于太上老君常说清静经关于太上老君常说清静经关于太上老君常说清静经",
  },
  {
    title: "太上老君常说清静经2",
    time: "2021-09-29",
    content: "关于太上老4君常说清静经关于太上老君常说清静经关于太上老君常说清静经关于太上老君常说清静经",
  }
]
const ListArticle = () => {
  const [data, setData] = React.useState<Array<any>>(mokData)
  return (
    <>
    {data.map((item: ListItemProp) =><ListItem 
    key={item.title}
    title={item.title}
    time={item.time}
    content={item.content}
    ></ListItem>)}
    </>
  )
}
interface ListItemProp {
  title?: string,
  content?: string,
  time?: string
}

const ListItem: React.FC<(ListItemProp)> = (props) => {
  return (
    <ListCard style={{marginBottom:10}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}     
          </Typography>
          <Typography gutterBottom  color='textSecondary' variant="overline" component="div">
              {props.time}
            </Typography>
          <Typography variant="body2" color="initial">
            {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </ListCard>
  )

}
export default ListArticle;