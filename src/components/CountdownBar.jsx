import { useState, useEffect } from "react";

export default function CountdownBar({ num, step }) {
  const [percent, setPercent] = useState(0); 

  useEffect(() => {
    setPercent( (step / num * 100) )
  }, [step])

  return <div className="countdown-bar-container">
    <div className="__wrap">
      <div className="__wrap-inner" style={{ width: `${ percent }%` }}></div>
    </div>
    <span className="__number">{ num - step }</span>
  </div>
}