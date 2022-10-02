import { Role } from "../constants/role";
import { DocumentData } from "firebase/firestore";

// TODO: these types may not all be accurate - refer to quiz-real branch when finalizing

export interface User {
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  birthday: Date;
  age: number;
  incomeLevel: number;
}

export interface Address {
  streetNumber: number;
  streetName: string;
  city: string;
  state: string;
  zip: number;
}

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

export interface Resource extends DocumentData {
  id: string;
  name: string;
  description: string;
  incomeLevel: number;
  employed: boolean
}
