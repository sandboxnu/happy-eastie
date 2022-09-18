import { collection, getDocs } from "firebase/firestore"; 
import {db} from "./firebaseInteractor"

const getCollectionData = async (collectionName : string) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs
}

