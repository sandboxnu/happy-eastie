import { initializeApp } from "firebase/app";
import { collection, doc, DocumentData, getDoc, getDocs, QueryDocumentSnapshot, setDoc, CollectionReference, FirestoreDataConverter, getFirestore, query, where, WhereFilterOp } from "firebase/firestore";
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
  db = db;
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
        income: docData.income
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

  // TODO: finish this function to get all events
  /**
   * Gets the list of all events currently in the Firestore database
   */
  async getEventList(): Promise<Event[]> {

    const allEvents = await getDocs(collection(this.db, "rounds"));
    const eventsInDB: Event[] = [];

    allEvents.docs.forEach(
      async (roundDocSnapShot: QueryDocumentSnapshot<DocumentData>) => {
        eventsInDB.push({
          name: roundDocSnapShot.name,
          description: roundDocSnapShot.description,
          summary: roundDocSnapShot.summary
        });
      }
    );

    return eventsInDB;

  }

  async getCollectionData<T extends DocumentData>(collectionName: string, converter: FirestoreDataConverter<T>, queryParams: WhereQuery): Promise<Array<T>> {
    const collectionReference: CollectionReference<T> = collection(this.db, collectionName).withConverter(converter)
    const queryReference = query(collectionReference, where(queryParams.field, queryParams.comparison, queryParams.value))
    const querySnapshot = await getDocs(queryReference);
    const list: Array<T> = []
    querySnapshot.forEach((snapshot: QueryDocumentSnapshot<T>) => list.push(converter.fromFirestore(snapshot)))
    return list
  }
}

export type WhereQuery = {
  field: string,
  comparison: WhereFilterOp,
  value: any
}