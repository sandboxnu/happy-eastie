import { Role } from "../constants/role";
import { DocumentData } from "firebase/firestore";
export interface User {
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  birthday: Date;
  age: number;
  income: number;
}

export interface Address {
  streetNumber: number;
  streetName: string;
  city: string;
  state: string;
  zip: number;
}

// TODO: build out these types if storing all data within User becomes unrealistic
// export interface FormResponse {

// }

export interface FormQuestion {
  id: number;
  question: string;
  description?: string;
}

export type UID = string;

// TODO: update this type once Firestore is updated
export interface Event {
  name: string;
  description: string;
  summary: string;
  // location: Address;
  // startTime: Date;
  // endTime: Date;
  // attendees: UID[];
}

export interface Service extends DocumentData {
  name: string;
  description: string;
  incomeLevel: number;
}
