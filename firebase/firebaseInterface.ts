import { collection, CollectionReference, DocumentData, FirestoreDataConverter, getDocs, query, QueryDocumentSnapshot, QuerySnapshot, where, WhereFilterOp } from "firebase/firestore"; 
import {db} from "./firebaseInteractor"

export type WhereQuery = {
    field: string,
    comparison: WhereFilterOp,
    value: any
}

export async function getCollectionData<T extends DocumentData>(collectionName : string, converter: FirestoreDataConverter<T>, queryParams: WhereQuery) : Promise<Array<T>> {
    const collectionReference : CollectionReference<T> = collection(db, collectionName).withConverter(converter)
    const queryReference = query(collectionReference, where(queryParams.field, queryParams.comparison, queryParams.value))
    const querySnapshot = await getDocs(queryReference);
    const list : Array<T> = []
    querySnapshot.forEach((snapshot : QueryDocumentSnapshot<T>) => list.push(converter.fromFirestore(snapshot)))
    return list
}

