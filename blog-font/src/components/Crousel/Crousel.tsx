import { Button, IconButton } from "@material-ui/core";
import React, { RefObject, useRef } from "react";
import { CrouSelContain, CrouSelItem, CrouselIcon, BackShadow, CrouselContent } from "./CrouselStyle";
import { SwapHorizontalCircle, ThreeDRotation } from '@material-ui/icons';
import { useEffect } from "react";
import { setTimeout } from "timers";
import { removeListener } from "process";
import { Article } from "../../models/model";
import { log } from "console";

export interface CarouselProps {
  imageUrl: string[],
  switchTime: number,
}

const Carousel: React.FC<(CarouselProps)> = (props) => {
  const [index, setIndex] = React.useState<number>(0);
  const [time, setTime] = React.useState<string>('0.5');
  const [iconIndex, setIconIndex] = React.useState<number>(0);
  const [elements, setElements] = React.useState<Array<any>>(props.imageUrl)
  const [clock, setClock] = React.useState<NodeJS.Timeout>();
  const [translat, setTranslat] = React.useState<number>(0);
  const countIndex = useRef<number>(index);
  const lastImg: any = useRef();
  const crouselContain = useRef<HTMLUListElement>(null);
  useEffect(() => {
    setElements(props.imageUrl);
  }, [props.imageUrl])

  useEffect(() => {
    countIndex.current = index;   //让countRef.current永远和count保持一致，避免其他操作改变了count的值 
    // alert(countIndex.current)   
    if (countIndex.current === -1) {
      setTranslat( 100)
    } else {
      setTranslat(-(index * 100))
    }
    if (countIndex.current === 0 || countIndex.current === 5) {
      setTimeout(() => crouselContain.current!.style.transition = ``, 10)
    }

  }, [index])

  useEffect(() => {
    if (elements.length !== 0) {
      addClock();
      crouselContain.current!.addEventListener('transitionend', function () {
        if (countIndex.current === elements.length) {
          crouselContain.current!.style.transition = `0s`
          setIndex(0);
        }
        if (countIndex.current === -1) {
          crouselContain.current!.style.transition = `0s`
          setIndex(elements.length - 1);

        }

      }
      );
    }
    return () => {
      clearInterval(clock!);
    };
  }, [elements]);
  const addClock = () => {
    setClock(setInterval(() => {
      if (countIndex.current >= elements.length) {
        setIndex(0);
      } else{
        setIndex((countIndex.current+1))
      }
    }, props.switchTime))
  }
  return (
    <CrouselContent>
      <CrouSelContain
        style={{ left: `${translat}%` }}
        transitionTime={time}
        ref={crouselContain}
        onMouseDown={(e) => {
          crouselContain.current!.style.transition = `0s`
          const startX = e.pageX;
          const initTrans = Number.parseFloat(crouselContain.current!.style.left.replace('%', ''));
          const handleMove = (e: MouseEvent) => {
            const width = crouselContain.current?.clientWidth!;
            const des = e.pageX - startX;
            const result = Number.parseFloat((des / width * 100).toFixed(2));
            crouselContain.current!.style.left = `${result + initTrans}%`
          }
          const handleUp = (e: MouseEvent) => {
            
            const endX = Number.parseFloat(crouselContain.current!.style.left.replace('%', ''));
            crouselContain.current!.style.transition = ``
            const res = endX - initTrans;
            if (res > 0) {
              if (res > 33.33) { setIndex(index - 1) }
              else { crouselContain.current!.style.left = `${-(index * 100)}%` }
            } else {
              if (res < -33.33) setIndex(index + 1)
              else crouselContain.current!.style.left = `${index * 100}%`

            }
            window.removeEventListener('mousemove', handleMove)
            window.removeEventListener('mouseup', handleUp)
          }
          window.addEventListener('mousemove', handleMove);
          window.addEventListener('mouseup', handleUp)
        }}
        onMouseLeave={() => {
          if (clock) {
            addClock()
          }
        }} onMouseOver={() => {
          if (clock) {
            clearInterval(clock!);
          }
        }}
      >

        <CrouSelItem ref={lastImg} leftWidth={`-${100}%`}>
          <img onDragStart={() => false} src={elements[elements.length - 1]} alt="loading" />
        </CrouSelItem>

        {elements.map((item, _index) => <CrouSelItem key={_index}
          leftWidth={`${_index * 100}%`}
        >
          <img src={item} alt="loading" />
        </CrouSelItem>)}

        <CrouSelItem ref={lastImg} leftWidth={`${elements.length * 100}%`}>
          <img onDragStart={() => false} src={elements[0]} alt="loading" />
        </CrouSelItem>
      </CrouSelContain>
      <BackShadow></BackShadow>
      <Button variant="contained" style={{
        background: '#C51622',
        color: 'white',
        position: 'absolute',
        bottom: '20%',
        left: '4%',
        zIndex: 2,
        borderRadius: '1.5rem',
        height: '3rem',
        width: '7rem',
      }}> 点击阅读</Button>


      <CrouselIcon>
        {elements.map((item, _index) => <IconButton key={_index} onClick={() => setIndex(_index)} style={{ color: '#fff' }}  ><SwapHorizontalCircle style={{ color: `${_index === index ? ' #fff' : '#6b6767'}` }}></SwapHorizontalCircle></IconButton>)}
      </CrouselIcon>
    </CrouselContent>

  )
}

export default Carousel;