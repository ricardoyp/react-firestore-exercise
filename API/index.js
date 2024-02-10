import { deleteDoc, doc, getDocs, orderBy, setDoc } from "firebase/firestore";
import { db, songsRef } from "../config/firebase";

export const getSongs = async () => {
    const querySnapshot = await getDocs(songsRef, orderBy("year"));
    return querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id })); // Agregamos el id del documento
}

export const setSong = async (data) => {
    // console.log("data: ", data);
    await setDoc(doc(songsRef), data);
}

export const deleteSong = async (documentId) => {
    // console.log("documentId: ", documentId);
    await deleteDoc(doc(db, "songs-react-firebase", documentId));
}
