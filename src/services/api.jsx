import { db } from './firebase';
import { collection, doc, setDoc, query, getDocs, getDoc, addDoc, where, limit, onSnapshot } from "firebase/firestore"; 

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
  const docRef = doc(db, 'tele_users', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let res = docSnap.data();
    res.__id = docSnap.id;
    return res;
  } else {
    return false;
  }
}

const addUser = async (user) => {
  const docRef = await addDoc(collection(db, 'tele_users'), user);
  return docRef.id;
}

const findUserByTeleID = async (teleID) => {
  const q = query(collection(db, "tele_users"), where("teleuid", "==", teleID), limit(1));
  const querySnapshot = await getDocs(q);
  let res =  (querySnapshot.empty == false ? querySnapshot.docs[0].data() : false);
  if(res != false) {
    res.__id = querySnapshot.docs[0].id
  }
  return res;
}

const updateUser = async (id, data) => {
  const docRef = collection(db, 'tele_users');
  await setDoc(doc(docRef, id), data, { merge: true });
}

const listennerDoc = (collecton, id, callback) => {
  const unsubscribe = onSnapshot(doc(db, collecton, id), (doc) => {
    // console.log("Current data: ", doc.data());
    callback(doc.id, doc.data())
  });

  return unsubscribe;
}

const listennerCollection = (collecton, callback) => {
  const unsubscribe = onSnapshot(collection(db, collecton), (snapshot) => {
    let res =  snapshot.docs.map(doc => {
      let d = doc.data();
      d.__id = doc.id
      return d;
    });
    callback(res);
  })

  return unsubscribe;
}

const getSettings = async () => {
  const docRef = doc(db, 'settings', 'global_settings')
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let res = docSnap.data();
    res.__id = docSnap.id;
    return res;
  } else {
    return false;
  }
}

const onSaveSettings = async (id, data) => {
  const docRef = collection(db, 'settings');
  await setDoc(doc(docRef, id), data, { merge: true });
}

export { getUsers, getUser, addUser, findUserByTeleID, updateUser, listennerDoc, listennerCollection, getSettings, onSaveSettings }