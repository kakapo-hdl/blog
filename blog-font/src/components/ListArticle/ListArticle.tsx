import { CardActionArea, CardContent, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { getArticle } from "../../api/service";
import { Article, Message } from "../../models/model";
import { ListCard } from "./ComponentStyle";
import { useHistory } from 'react-router-dom'
import { GrobalContext } from "../../views/IndexPage";
import moment from "moment";
export interface Props {
  // name?: String;
  // enthusiasmLevel: number;
  // onIncrement?: () => void;
  // onDecrement?: () => void;
}

const ListArticle = () => {
  const [articles,setArticles] = useState<Array<Article>>([])
  const   showMessage: (mes: Message)=>void =useContext(GrobalContext);

  useEffect( ()=>{
    async function fetchData() {
      showMessage({message:'loadding...',type:'info',isLoading:true})
      const response = await getArticle();
      if(response.status===200){
        setArticles(response.data);     
        showMessage({ message: 'loading success', type: 'success', isLoading: false });

      }
    }
    fetchData();  
  },[])
  return (
    <>
    {articles.map((item: Article) =><ListItem 
      key={item.id}
      description={item.description}
      createTime={item.createTime}
      title={item.title}  
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
              {moment(props.createTime).format('YYYY-MM-DD HH:mm')}
            </Typography>
          <Typography variant="body2" color="initial">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </ListCard>
  )

}
export default ListArticle;