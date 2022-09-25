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

// export interface Service extends DocumentData {
//   name: string;
//   description: string;
//   incomeLevel: number;
// }

export interface SurveyAnswers {
  income?: number;
  language?: string;
  citizenship?: Citizenship;
  parentAge?: number;
  childAge?: number;
  family?: Family;
  employmentStatus?: EmploymentStatus;
  insurance?: Insurance;
  accessibility?: Accessibility;
}

export interface Service extends DocumentData {
  name: string;
  description: string;
  url: string;
  income?: Range[];
  language?: String[];
  citizenship?: Citizenship[];
  parentAge?: Range[];
  childAge?: Range[];
  family?: Family[];
  employmentStatus?: EmploymentStatus[];
  insurance?: Insurance[];
  accessibility?: Accessibility[];
}

//Inclusive!!!
export type Range = {
  minimum: number;
  maximum: number;
};

export type Citizenship =
  | "Undocumented"
  | "Non-Immigrant"
  | "Resident"
  | "Citizen"
  | "Eligible Non-Citizen";

export type Family = "Nuclear" | "Expecting" | "Extended" | "Single-Parent";

export type EmploymentStatus =
  | "Currently Working"
  | "Seeking Employment"
  | "Studying"
  | "Stay at Home";

export type Insurance = "Uninsured" | "Private" | "Public";

export type Accessibility =
  | "Speech"
  | "Vision"
  | "Hearing"
  | "Mental"
  | "Digital Literacy";
