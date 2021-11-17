import { CardActionArea, CardContent, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getArticle } from "../../api/service";
import { Article } from "../../models/model";
import { ListCard } from "./ComponentStyle";
import { useHistory } from 'react-router-dom'
export interface Props {
  // name?: String;
  // enthusiasmLevel: number;
  // onIncrement?: () => void;
  // onDecrement?: () => void;
}

const ListArticle = () => {
  const [articles,setArticles] = useState<Array<Article>>([])
  

  useEffect( ()=>{
    async function fetchData() {
      const response = await getArticle();
      setArticles(response.data);     
    }
    fetchData();  
  },[])
  return (
    <>
    {articles.map((item: Article) =><ListItem 
      key={item.id}
      title={item.title}
      createTime={item.createTime}
      content={item.content}  
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
    <ListCard onClick={()=>{handleClick(props.id)}} style={{marginBottom:10}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}     
          </Typography>
          <Typography gutterBottom  color='textSecondary' variant="overline" component="div">
              {props.createTime}
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