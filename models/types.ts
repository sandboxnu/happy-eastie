import { Role } from "../constants/role";

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

export interface Event {
    name: string;
    location: Address;
    description: string;
    startTime: Date;
    endTime: Date;
    attendees: UID[];
}

export interface Service {
  name: string;
  description: string;
  incomeLevel: number;
}
