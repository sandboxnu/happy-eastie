import { collection, DocumentData, FirestoreDataConverter, getDocs, QueryDocumentSnapshot } from "firebase/firestore"; 
import {db} from "./firebaseInteractor"

export async function getCollectionData<T>(collectionName : string, converter: FirestoreDataConverter<T>) : Promise<QueryDocumentSnapshot<DocumentData>> {
    const querySnapshot = await getDocs(collection(db, collectionName).withConverter(converter));
    return querySnapshot.docs
}

