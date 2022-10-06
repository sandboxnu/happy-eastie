import { Role } from "../constants/role";
import { DocumentData, GeoPoint, Timestamp } from "firebase/firestore";

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
    id: string;
    name: string;
    description: string;
    summary: string;
    location: GeoPoint;
    start: Timestamp;
    end: Timestamp;
    // attendees: UID[];
}

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

export enum Citizenship {
    "Undocumented",
    "Non-Immigrant",
    "Resident",
    "Citizen",
    "Eligible Non-Citizen"
}

export enum Family {
    "Nuclear",
    "Expecting",
    "Extended",
    "Single-Parent"
}

export enum EmploymentStatus {
    "Currently Working",
    "Seeking Employment",
    "Studying",
    "Stay at Home"
}

export enum Insurance {
    "Uninsured",
    "Private",
    "Public"
}

export enum Accessibility {
    "Speech",
    "Vision",
    "Hearing",
    "Mental",
    "Digital Literacy"
}

export interface Resource extends DocumentData {
    id: string;
    name: string;
    description: string;
    incomeLevel: number;
    employed: boolean
}
