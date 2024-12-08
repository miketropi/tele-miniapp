import messageBox from '../assets/message-box.png';
export default function Kombat({ kombat }) {
  

  return <div className="kombat-container">
    <div className="message-box">
      <img className="message-box__image" src={ messageBox } />
      <div className="message-box__text">{ kombat.message }</div>
    </div>
    <img className="__ava" src={ kombat.image } alt="A1A" />
  </div>
}