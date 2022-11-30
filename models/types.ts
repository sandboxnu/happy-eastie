import { Role } from "../constants/role";
import { DocumentData, GeoPoint, Timestamp } from "firebase/firestore";
import { Document, ObjectId, WithId } from "mongodb";

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
export interface Event extends EventInfo {
    id: string;
}

export interface EventInfo {
    name: string;
    description: string;
    summary: string;
    location?: GeoPoint;
    start?: Timestamp;
    end?: Timestamp;
    // attendees: UID[];
}

export interface SurveyAnswers {
    category: ResourceCategory[];
    income?: number;
    language?: Language[];
    citizenship?: Citizenship;
    parentAge?: number;
    childAge?: number;
    family?: Family;
    employmentStatus?: EmploymentStatus;
    insurance?: Insurance;
    accessibility?: Accessibility[]; //TODO: Might need to change to multi-select, since people can have multiple accessibility needs
}

/**
 * @deprecated Use ResourceData instead. This should be deleted after ticket #.
 */
export interface Service extends DocumentData {
    name: string;
    description: string;
    url: string;
    income?: Range[];
    language?: String[];
    citizenship?: Citizenship;
    parentAge?: Range[];
    childAge?: Range[];
    family?: Family[];
    employmentStatus?: EmploymentStatus[];
    insurance?: Insurance[];
    accessibility?: Accessibility[];
}
export interface Resource {
    name: string;
    description?: string; // Markdown
    category?: ResourceCategory[];
    minimumIncome?: number;
    maximumIncome?: number;
    language?: String[];
    citizenship?: Citizenship[];
    minimumParentAge?: number;
    maximumParentAge?: number;
    minimumChildAge?: number;
    maximumChildAge?: number;
    family?: Family[];
    employmentStatus?: EmploymentStatus[];
    insurance?: Insurance[];
    accessibility?: Accessibility[];
    location?: GeoPoint;
    tags?: string[];
    url?: string;
    headerImageUrl: string;
    phoneNumber?: string;
    email?: string;
    pointOfContact: string;
    waitlist?: Waitlist;
    howToApply?: string; // Markdown
}

export type Waitlist = {
  description: string;
  helpText?: string;
}

//Inclusive!!!
export type Range = {
    minimum: number;
    maximum: number;
};

export enum Citizenship {
    Undocumented = "undocumented",
    Non_Immigrant = "nonImmigrant",
    Resident="resident",
    Citizen="citizen",
    Eligible_Non_Citizen="eligibleNonCitizen"
}

export enum Family {
    Nuclear = "nuclear",
    Expected = "expected",
    Extended = "extended",
    Single_Parent = "singleParent",
    Grandparent = "grandparent",
    Foster = "foster"
}

export enum EmploymentStatus {
    Currently_Working = "currentlyWorking",
    Seeking_Employment = "seekingEmployment",
    Studying = "studying",
    Stay_At_Home = "stayAtHome"
}

export enum Insurance {
    Uninsured = "uninsured",
    Private = "private",
    Public = "public"
}

export enum Accessibility {
    Speech = "speech",
    Vision = "vision",
    Hearing = "hearing",
    Mental = "mental",
    DigitalLiteracy = "digitalLiteracy"
}

export enum Language {
   English = "english",
   Spanish = "spanish",
   Portuguese = "portuguese",
   Chinese = "chinese",
   Vietnamese = "vietnamese",
   Arabic = "arabic",
   Haitian_Creole = "haitianCreole"
}

export enum ResourceCategory {
    Childcare = "childcare", 
    Healthcare = "healthcare", 
    FinancialHelp = "financialHelp", 
    ImmigrationAssistance = "immigrationAssistance", 
    Housing = "housing"
}

// TODO: update this type with all sorting methods possible
// once we know what those are
export enum ResourceSortingMethod {
    Alphabetical = "Alphabetical",
    Sort2 = "Sort2",
    Sort3 = "Sort3",
    Sort4 = "Sort4",
    Sort5 = "Sort5"
}
