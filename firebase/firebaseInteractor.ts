import { initializeApp } from "firebase/app";
import { collection, CollectionReference, DocumentData, FirestoreDataConverter, getDocs, getFirestore, query, QueryDocumentSnapshot, where, WhereFilterOp } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmdJmtmltlGNL9_OiwefAn2VmhLbtpwAg",
    authDomain: "happy-eastie.firebaseapp.com",
    projectId: "happy-eastie",
    storageBucket: "happy-eastie.appspot.com",
    messagingSenderId: "786219075341",
    appId: "1:786219075341:web:788a1c7da63cf9d33e9244",
    measurementId: "G-ZP1KEZ1253"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * A class to interact with Firebase. This class stores the current state,
 * including a reference to the firestore, and the current authenticated user.
 * This adds a level of abstraction around Firebase, so that this is the only
 * object dealing with the server.
 */
 export default class FirebaseInteractor {
  db = db;

  async getCollectionData<T extends DocumentData>(collectionName : string, converter: FirestoreDataConverter<T>, queryParams: WhereQuery[]) : Promise<Array<T>> {
    const collectionReference : CollectionReference<T> = collection(this.db, collectionName).withConverter(converter)
    const queryConstraints = queryParams.map((q : WhereQuery) => where(q.field, q.comparison, q.value))
    const queryReference = query(collectionReference, ...queryConstraints)
    const querySnapshot = await getDocs(queryReference);
    const list : Array<T> = []
    querySnapshot.forEach((snapshot : QueryDocumentSnapshot<T>) => list.push(converter.fromFirestore(snapshot)))
    return list
  }
}

export type WhereQuery = {
  field: string,
  comparison: WhereFilterOp,
  value: any
}