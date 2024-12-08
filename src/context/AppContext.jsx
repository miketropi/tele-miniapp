import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, collection, query, where, getDocs, setDoc } from 'firebase/firestore/lite';

const AppContext = createContext(null);

const AppContextProvider = ({ children, WebApp }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const __query = async () => {
      const q = query(collection(db, "tele_users"), where("teleuid", "==", WebApp.initDataUnsafe?.user?.id ?? ''));
      const querySnapshot = await getDocs(q);
      
      if(querySnapshot.empty == true) {
        await addNewUser(WebApp.initDataUnsafe?.user);
      } else {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
          if(!doc) return;
  
          let res = doc.data();
          res.__id = doc.id;
          setUser(res);
        });
      }
      
    }

    __query();
    return;
  }, [])

  const addNewUser = async (teleUser) => {
    const newUser = {
      point: 0,
      tele_userinfo_full: teleUser, 
      teleuid: teleUser?.id,
      turn: 3,
    }
    await setDoc(doc(db, "tele_users", `id_${ teleUser?.id }`), newUser);
    setUser({ ...newUser, __id: `id_${ teleUser?.id }` }) 
  }

  const value = {
    version: '1.0.0',
    teleUser: WebApp.initDataUnsafe,
    user, setUser 
  }

  return <AppContext.Provider value={ value }>
    { children }
  </AppContext.Provider>
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { useAppContext, AppContextProvider }