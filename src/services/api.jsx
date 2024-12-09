import { db } from './firebase';
import { collection, doc, setDoc, query, getDocs } from "firebase/firestore"; 

const getUsers = async () => {
  const q = await query(collection(db, 'tele_users'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    let d = doc.data();
    d.__id = doc.id
    return d;
  });
}

const getUser = async (id) => {

}

export { getUsers, getUser }