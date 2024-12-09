import { createContext, useContext, useEffect, useState } from "react";

import { getUser, findUserByTeleID, addUser, updateUser, listennerDoc } from '../services/api'

const AppContext = createContext(null);

const AppContextProvider = ({ children, WebApp }) => {
  const [user, setUser] = useState(null); 
  // alert(JSON.stringify(WebApp.initDataUnsafe?.user?.id))
  useEffect(() => {
    const __query = async () => {
      let __u = await findUserByTeleID(WebApp.initDataUnsafe?.user?.id);
      // alert('userExists', JSON.stringify(userExists), WebApp.initDataUnsafe?.user?.id)
      if(__u == false) {
        __u = await addNewUser(WebApp.initDataUnsafe?.user);
        setUser(__u);
      }

      setUser(__u);
      listennerDoc('tele_users', __u.__id, (id, data) => {
        // alert(JSON.stringify(user));
        setUser({ ...data, __id: id });
      })
    }
    __query();
  }, [])

  const addNewUser = async (teleUser) => {
    const newUser = {
      point: 0,
      tele_userinfo_full: teleUser, 
      teleuid: teleUser?.id,
      turn: 3,
    }
    const uid = await addUser(newUser);
    return { ...newUser, __id: uid }
  }

  const onUpdateTurn = async (turn) => {
    await updateUser(user.__id, {
      turn
    })
  }

  const onAddPoint = async (point) => {
    let newPoint = parseInt(point) + user.point;
    await updateUser(user.__id, {
      point: newPoint,
    })
  }

  const value = {
    version: '1.0.0',
    teleUser: WebApp.initDataUnsafe,
    user, setUser,
    fn: {
      onUpdateTurn,
      onAddPoint,
    }
  }

  return <AppContext.Provider value={ value }>
    { children }
  </AppContext.Provider>
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { useAppContext, AppContextProvider }