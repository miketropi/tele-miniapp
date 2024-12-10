import '../backend-view.scss';
import { BackendViewContextProvider, useBackendViewContext } from '../context/BackendViewContext';
import UsersTableList from '../components/UsersTableList';
import UserEditModal from '../components/UserEditModal';
import GameSettings from '../components/GameSettings';

const BackendView = () => {
  const { version } = useBackendViewContext();

  return <div className="backend-view">
    <div className="container">
      <div className="heading">
        <h2>Backend View</h2>
      </div>
      <GameSettings />
      <div style={{ margin: `3em 0 2em`, borderBottom: 'solid 1px #ddd' }}></div>
      <UsersTableList />
    </div>

    <UserEditModal />
  </div>
}

export default function BackendViewWrap() {
  return <BackendViewContextProvider>
    <BackendView />
  </BackendViewContextProvider>
}