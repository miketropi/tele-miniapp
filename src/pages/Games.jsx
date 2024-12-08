import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import CountdownBar from "../components/CountdownBar";
import gameBg from '../assets/game-bg.jpg'
import Kombat from '../components/Kombat';
import { useState, useEffect, useRef } from "react";
import kombat1 from '../assets/kombat-1.png';

const __KOMBATTEM = [
  {
    image: kombat1,
    message: 'Đã ai làm gì đâu, đã ai đụng vào đâu!!!'
  },
  {
    image: kombat1,
    message: 'Anh cho mày ún trà hoa cook!!!'
  },
  {
    image: kombat1,
    message: 'Em nhắc anh!!!'
  },
  {
    image: kombat1,
    message: 'M..` nói tiếng nữa coi!!!'
  },
];

export default function Games() {
  const { user } = useAppContext(); 
  const [startAfter, setStartAfter] = useState(5);
  const [gameStart, setGameStart] = useState(false);
  const [timerIngame, setTimerIngame] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [randIndex, setRandIndex] = useState(Math.floor(Math.random() * __KOMBATTEM.length));
  const [point, setPoint] = useState(0);

  const $panelRef = useRef();

  useEffect(() => {
    if(startAfter <= 0) {
      setGameStart(true);
      return;
    };
    let countdownInterval = setInterval(() => {
      let n = startAfter - 1;
      setStartAfter(n)
    }, 1000)
    return () => {
      clearInterval(countdownInterval);
    }
  }, [startAfter])

  useEffect(() => {
    if(gameStart != true) return;
    if(timerIngame == 30) {
      setEndGame(true);
      return;
    }

    let timerIngameInterval = setInterval(() => {
      let n = timerIngame + 1;

      if([5,10,15,20,25,29].includes(n)) {
        setRandIndex(Math.floor(Math.random() * __KOMBATTEM.length))
      }
      
      setTimerIngame(n)
    }, 1000)

    return () => {
      clearInterval(timerIngameInterval)
    }
  }, [gameStart, timerIngame])

  const onAnimHit = (even) => {
    const { clientX, clientY } = even;
    let span = document.createElement('SPAN');
    let rand1 = Math.floor(Math.random() * (100 - -100 + 1) + -100);
    let rand2 = Math.floor(Math.random() * (100 - -100 + 1) + -100);

    span.innerHTML = '+1';
    span.classList.add('hit-anim');
    span.style.left = `${ clientX + rand1 }px`;
    span.style.top = `${ clientY + rand2 }px`;

    $panelRef.current.appendChild(span);
    setTimeout(() => {
      span.remove();
    }, 1000)
  }

  return <div ref={ $panelRef } className="game-container" onClick={ function(e) {
    e.preventDefault();
    if(gameStart == true && endGame == false) {
      let p = point + 1;
      setPoint(p)
      onAnimHit(e);
    }
    
  } }>
    <div className="layer-top">
      { gameStart ? <CountdownBar num={ 30 } step={ timerIngame } /> : '' }
    </div>
    <div className="layer-bg" style={{ background: `url(${ gameBg }) no-repeat center center / cover, #333` }}></div>
    <div className="layer-center">
      {
        (() => {
          return endGame ? <>
            Your points { point }
          </> : <>
            {
              gameStart 
                ? <Kombat kombat={ __KOMBATTEM[randIndex] } /> 
                : <p>Bạn có 30s để nện đối phương<br/>bắt đầu trong { startAfter }s</p>
            }
          </>
        })()
      }
      
    </div>
    <div className="layer-footer">
      <span className="__point">Tap Tap Tap: { point }</span>
    </div>
  </div>
}