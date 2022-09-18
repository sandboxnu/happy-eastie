import { collection, DocumentData, FirestoreDataConverter, getDocs, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore"; 
import {db} from "./firebaseInteractor"

export async function getCollectionData<T extends DocumentData>(collectionName : string, converter: FirestoreDataConverter<T>) : Promise<Array<T>> {
    const querySnapshot = await getDocs(collection(db, collectionName).withConverter(converter));
    const list : Array<T> = []
    querySnapshot.forEach((snapshot : QueryDocumentSnapshot<T>) => list.push(converter.fromFirestore(snapshot)))
    return list
}

