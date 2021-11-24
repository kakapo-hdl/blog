import { CardActionArea, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { Article, Message } from "../../models/model";
import { ListCard } from "./ComponentStyle";
import { useHistory } from 'react-router-dom'
import { GrobalContext } from "../../views/IndexPage";
import moment from "moment";
import { Card, CardMedia } from "@mui/material";
export interface Props {
  // name?: String;
  // enthusiasmLevel: number;
  // onIncrement?: () => void;
  // onDecrement?: () => void;
}

const ListArticle: React.FC<({ articles: Article[] })> = (props) => {
  const { articles } = props;
  return (
    <>
      {articles.map((item: Article) => <ListItem
        key={item.id}
        description={item.description}
        createTime={item.createTime}
        title={item.title}
        imageUrl={item.imageUrl}
        id={item.id}
      ></ListItem>)}
    </>
  )
}
const ListItem: React.FC<(Article)> = (props) => {
  const history = useHistory();
  const handleClick = (key?: number) => {
    history.push(`/ArticleDisplay/${key}`);
  }
  return (
    <ListCard onClick={() => { handleClick(props.id) }} style={{ marginBottom: 10 }}>

      <CardActionArea>
        <Card sx={{ display: 'flex',justifyContent:'space-between' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography gutterBottom color='textSecondary' variant="overline" component="div">
              {moment(props.createTime).format('YYYY-MM-DD HH:mm')}
            </Typography>
            <Typography variant="body2" color="initial">
              {props.description}
            </Typography>
            {props.imageUrl}
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 200 }}
            image={props.imageUrl}
            alt="Live from space album cover"
          />
        </Card>
      </CardActionArea>





    </ListCard>
  )

}
export default ListArticle;