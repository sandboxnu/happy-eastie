import { initializeApp } from "firebase/app";
import { collection, doc, DocumentData, getDoc, getDocs, QueryDocumentSnapshot, setDoc, CollectionReference, FirestoreDataConverter, getFirestore, query, where, WhereFilterOp, Firestore, QueryConstraint, Query, QuerySnapshot, DocumentSnapshot, addDoc, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signOut } from "firebase/auth";
import { Role } from "../constants/role";
import { UID, User, Event } from "../models/types";

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
const auth = getAuth(app);

/**
 * A class to interact with Firebase. This class stores the current state,
 * including a reference to the firestore, and the current authenticated user.
 * This adds a level of abstraction around Firebase, so that this is the only
 * object dealing with the server.
 */
export default class FirebaseInteractor {
  db : Firestore = db;
  auth = auth;

  
  /**
   * Created an account for a user and stores them in the database
   */
  async createAccount(email: string, password: string) {
    const userAuth = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (userAuth.user?.uid == null) {
      throw new Error("No actual user");
    }

    sendEmailVerification(userAuth.user);
    const userDoc = doc(this.db, "users", userAuth.user.uid);

    // TODO: set role of user (user or admin) here
    await setDoc(userDoc, {
      role: Role.USER,
      firstName: "",
      email: email,
    });
  }

  /**
   * Returns the User that is associated with the user id passed in
   */
  async getUserById(userId: UID): Promise<User> {
    return (await getDoc(doc(this.db, "users", userId))).data() as User;
  }

  /**
   * Returns the currently-authenticated user and throws an error
   * if no user is found
   */
  async getUser(): Promise<User> {
    const user = this.auth.currentUser;

    if (user !== null) {
      const docData = (await getDoc(doc(this.db, "users", user.uid))).data();

      if (docData === undefined) {
        throw new Error("No data found");
      }

      return {
        role: (docData.role as Role) ?? Role.USER,
        firstName: docData.firstName,
        lastName: docData.lastName,
        email: docData.email,
        address: docData.address,
        birthday: docData.birthday,
        age: docData.age,
        incomeLevel: docData.incomeLevel
      };
    }

    throw new Error("No user found");
  }

  /**
   * Logs out the current authenticated user
   */
  async logout() {
    await signOut(this.auth);
  }

  async getCollectionData<T extends DocumentData>(collectionName : string, converter: FirestoreDataConverter<T>, queryParams: WhereQuery[]) : Promise<Array<T>> {
    const collectionReference : CollectionReference<T> = collection(this.db, collectionName).withConverter(converter)
    const queryConstraints : QueryConstraint[] = queryParams.map((q : WhereQuery) => where(q.field, q.comparison, q.value))
    const queryReference : Query<T> = query(collectionReference, ...queryConstraints)
    const querySnapshot : QuerySnapshot<T> = await getDocs(queryReference);
    const list: Array<T> = []
    querySnapshot.forEach((snapshot: QueryDocumentSnapshot<T>) => list.push(converter.fromFirestore(snapshot)))
    return list
  }

  async getDocumentById<T extends DocumentData>(collectionName : string, id: string, converter: FirestoreDataConverter<T>) : Promise<T | undefined> {
    const docSnap : DocumentSnapshot = await getDoc(doc(db, collectionName, id))
    if (docSnap.exists()) {
      return converter.fromFirestore(docSnap)
    } else {
      return undefined
    }
  }

  async createDocument<T extends DocumentData>(collectionName: string, obj: T) : Promise<string> {
    const docRef = await addDoc(collection(db, collectionName), obj);
    return docRef.id
  }

  async updateDocument<T extends DocumentData>(collectionName: string, obj: T, id: string) : Promise<T> {
    await setDoc(doc(db, collectionName, id), obj)
    return obj
  }

  async deleteDocument(collectionName : string, id: string) : Promise<void> {
    await deleteDoc(doc(db, collectionName, id))
  }

  /* UNUSED - could be useful for getting list of ids for a collection that satisfy where query
  async getCollectionIds(collectionName : string, queryParams: WhereQuery[]) : Promise<Array<string>> {
    const collectionReference : CollectionReference<DocumentData> = collection(this.db, collectionName)
    const queryConstraints : QueryConstraint[] = queryParams.map((q : WhereQuery) => where(q.field, q.comparison, q.value))
    const queryReference : Query = query(collectionReference, ...queryConstraints)
    const querySnapshot : QuerySnapshot = await getDocs(queryReference);
    const list: Array<string> = []
    querySnapshot.forEach((snapshot: QueryDocumentSnapshot) => list.push(snapshot.id))
    return list
  }

  async createEvent(event: Event) : Promise<Event> {
    // Add a new document in collection "cities"
    const docRef = await addDoc(collection(db, "events"), event);
    event.id = docRef.id
    return event
  }
  */
  
}

export type WhereQuery = {
  field: string,
  comparison: WhereFilterOp,
  value: any
}