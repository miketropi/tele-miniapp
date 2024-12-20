import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import bgAnim from '../assets/bg-anim.gif';
import buttonPlay from '../assets/play.gif';
import UserFooter from '../components/UserFooter';
import WebApp from '@twa-dev/sdk';

export default function Welcome() {
  const { version, teleUser, user } = useAppContext();
  return <div id="welcome-page">
    <div className="logo">
      <img src={ Logo } />
      {/* { JSON.stringify(user) } */}
    </div>
    <div className="anim-bg">
      <img src={ bgAnim } />
    </div>
    <div className="scene"></div>
    <div className="action-button">
      {
        user && 
        (({ turn }) => {
          return (turn > 0 
            ? <Link to="/play" className="button-image"><img src={ buttonPlay } /></Link> 
            : <div className="not-turn">
              <strong>Hết lượt gòy bạn êy!!!</strong>
              <small style={{ fontSize: `12px` }}>(Làm nhiệm vụ để lấy thêm lượt chơi!!! coming soon)</small>
            </div>)
        })(user)
      }
    </div>
    <div className="welcome-footer">
      { 
        user && <UserFooter user={ user } />
      }
    </div>
  </div>
}