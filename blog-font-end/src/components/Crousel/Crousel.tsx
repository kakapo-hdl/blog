import { Button, IconButton } from "@material-ui/core";
import React, { useRef } from "react";
import { CrouSelContain, CrouSelItem, CrouselIcon, BackShadow } from "./CrouselStyle";
import { SwapHorizontalCircle, ThreeDRotation } from '@material-ui/icons';
import { useEffect } from "react";
import { setTimeout } from "timers";
import { removeListener } from "process";

export interface CarouselProps {

}

const Carousel: React.FC<(CarouselProps)> = (props) => {
  const [index, setIndex] = React.useState<number>(0);
  const [time, setTime] = React.useState<string>('0.8');
  const [iconIndex, setIconIndex] = React.useState<number>(0);
  const [elements, setElements] = React.useState<Array<any>>([
    'https://t7.baidu.com/it/u=860330160,4117395242&fm=193&f=GIF',
    'https://t7.baidu.com/it/u=210325151,3216581750&fm=193&f=GIF',
    'https://t7.baidu.com/it/u=1852835192,3466802497&fm=193&f=GIF',
    'https://t7.baidu.com/it/u=4256280520,1252070511&fm=193&f=GIF'
  ])
  const [timers, setTimers] = React.useState<Array<NodeJS.Timeout>>([]);
  const saveCallBack: any = useRef();
  const countIndex = useRef<number>(index);
  const lastImg: any = useRef();

  useEffect(() => {
    countIndex.current = index;   //让countRef.current永远和count保持一致，避免其他操作改变了count的值
    if(countIndex.current===0){
    setTimeout(()=>setTime('0.8'),0)
    }
  }, [index])
  // useEffect(() => {
 
  // },)
  useEffect(() => {
    lastImg.current.addEventListener('transitionend', function () {
      if (countIndex.current === elements.length) {
        setTime('0');
        setIndex(0);
      }
    }
    );
    const timer: NodeJS.Timeout = setInterval(()=>{
      if (countIndex.current === elements.length) {
        setIndex(0);
      } else {
        setIndex((countIndex.current + 1))
        if (countIndex.current === elements.length - 1) {
          setIconIndex(0)
        } else {
          setIconIndex((countIndex.current + 1))
        }
      }
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  });
  const selectPictrue = (index: number) => {
    setIndex(index)
    setIconIndex((index))
  }


  return (
    <>
      <CrouSelContain>

        {elements.map((item, _index) => <CrouSelItem key={_index} transitionTime={time} translat={`-${index * 100}`} leftWidth={`${_index * 100}%`}>
          <img src={item} />
        </CrouSelItem>)}
        <CrouSelItem transitionTime={time} ref={lastImg} translat={`-${index * 100}`} leftWidth={`${elements.length * 100}%`}>
          <img src={'https://t7.baidu.com/it/u=860330160,4117395242&fm=193&f=GIF'} />
        </CrouSelItem>
        <CrouselIcon>
          {elements.map((item, _index) => <IconButton  key={_index} onClick={() => selectPictrue(_index)} style={{ color: '#fff' }}  ><SwapHorizontalCircle style={{ color: `${_index === iconIndex ? ' #fff' :'#6b6767' }` }}></SwapHorizontalCircle></IconButton>)}
        </CrouselIcon>
        <BackShadow></BackShadow>
      </CrouSelContain>
    </>
  )
}

export default Carousel;