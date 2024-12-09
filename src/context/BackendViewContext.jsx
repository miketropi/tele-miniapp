import { createContext, useContext, useState, useEffect } from "react";
import { getUsers, getUser, addUser, findUserByTeleID, updateUser, listennerDoc, listennerCollection } from '../services/api';

const BackendViewContext = createContext(null);

const BackendViewContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userEdit, setUserEdit] = useState(null);
  const [modalEditActive, setModalEditActive] = useState(false);
  
  const onGetUsers = async () => {
    const res = await getUsers();
    setUsers(res);
  }

  useEffect(() => {
    onGetUsers();
    // listennerCollection('tele_users', (data) => {
    //   setUsers(data);
    // })
  }, [])

  // useEffect(() => {
  //   if(userEdit == null) return;
  //   const s = listennerDoc('tele_users', userEdit, (id, data) => {
  //     console.log(id, data);
  //   })

  //   return () => {
  //     s();
  //   }
  // }, [userEdit])

  const onUpdateUser = async (id, data) => {
    await updateUser(id, data);
    onGetUsers();
  }

  const value = {
    version: `1.0.0`,
    users, setUsers,
    userEdit, setUserEdit,
    modalEditActive, setModalEditActive,
    fn: {
      onUpdateUser,
      onGetUsers,
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