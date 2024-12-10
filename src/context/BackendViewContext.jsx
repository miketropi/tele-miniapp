import { createContext, useContext, useState, useEffect } from "react";
import { getUsers, getUser, addUser, findUserByTeleID, updateUser, listennerDoc, listennerCollection, getSettings, onSaveSettings } from '../services/api';

const BackendViewContext = createContext(null);

const BackendViewContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userEdit, setUserEdit] = useState(null);
  const [modalEditActive, setModalEditActive] = useState(false);
  const [gameSettings, setGameSettings] = useState(null);
  
  const onGetUsers = async () => {
    const res = await getUsers();
    setUsers(res);
  }

  const onGetGameSettings = async () => {
    const res = await getSettings();
    setGameSettings(res);
    // console.log(res);
  }

  useEffect(() => {
    onGetUsers();
    onGetGameSettings();
  }, [])

  const onUpdateUser = async (id, data) => {
    await updateUser(id, data);
    onGetUsers();
  }

  const onUpdateSettings = async (data) => {
    await onSaveSettings('global_settings', data);
  }

  const value = {
    version: `1.0.0`,
    users, setUsers,
    userEdit, setUserEdit,
    modalEditActive, setModalEditActive,
    gameSettings, setGameSettings,
    fn: {
      onUpdateUser,
      onGetUsers,
      onUpdateSettings,
    }
  }

  return <BackendViewContext.Provider value={ value }>
    { children }
  </BackendViewContext.Provider>
}

const useBackendViewContext = () => {
  return useContext(BackendViewContext);
}

export { BackendViewContextProvider, useBackendViewContext }