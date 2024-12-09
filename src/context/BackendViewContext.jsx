import { createContext, useContext, useState, useEffect } from "react";
import { getUsers } from '../services/api';

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
  }, [])

  const value = {
    version: `1.0.0`,
    users, setUsers,
    userEdit, setUserEdit,
    modalEditActive, setModalEditActive,
  }

  return <BackendViewContext.Provider value={ value }>
    { children }
  </BackendViewContext.Provider>
}

const useBackendViewContext = () => {
  return useContext(BackendViewContext);
}

export { BackendViewContextProvider, useBackendViewContext }