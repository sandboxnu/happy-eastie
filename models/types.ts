// import { Role } from "../constants/role";
// import { DocumentData, GeoPoint, Timestamp } from "firebase/firestore";
import { Document, ObjectId, WithId } from "mongodb";

// TODO: these types may not all be accurate - refer to quiz-real branch when finalizing
export interface GeoJsonPoint {
    type: "Point",
    coordinates: number[]
}

export interface User {
    // role: Role;
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
// export interface Event extends EventInfo {
//     id: string;
// }

// export interface EventInfo {
//     name: string;
//     description: string;
//     summary: string;
//     location?: GeoPoint;
//     start?: Timestamp;
//     end?: Timestamp;
//     // attendees: UID[];
// }

export interface SurveyAnswers {
    category: ResourceCategory[];  // changed to string[]
    income?: number;  // changed to householdIncome
    language?: Language[];  // changed to string[]
    citizenship?: Citizenship;  // deleted
    parentAge?: number;  // deleted
    childAge?: number;  // deleted
    family?: Family;  // deleted
    employmentStatus?: EmploymentStatus;  // deleted
    insurance?: Insurance;  // deleted
    //TODO: Might need to change to multi-select, since people can have multiple accessibility needs
    accessibility?: Accessibility[];  // changed to string[]
    
    // added householdMembers, documentations
}

/**
 * deprecated Use ResourceData instead. This should be deleted after ticket #.
 */
// export interface Service extends DocumentData {
//     name: string;
//     description: string;
//     url: string;
//     income?: Range[];
//     language?: String[];
//     citizenship?: Citizenship;
//     parentAge?: Range[];
//     childAge?: Range[];
//     family?: Family[];
//     employmentStatus?: EmploymentStatus[];
//     insurance?: Insurance[];
//     accessibility?: Accessibility[];
// }
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
    location?: GeoJsonPoint;
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
    Undocumented = "Undocumented",
    Non_Immigrant = "Non-Immigrant",
    Resident="Resident",
    Citizen="Citizen",
    Eligible_Non_Citizen="Eligible Non-Citizen"
}

export enum Family {
    Nuclear = "Nuclear",
    Expected = "Expecting",
    Extended = "Extended",
    Single_Parent = "Single-Parent",
    Grandparent = "Grandparent",
    Foster = "Foster"
}

export enum EmploymentStatus {
    Currently_Working = "Currently Working",
    Seeking_Employment = "Seeking Employment",
    Studying = "Studying",
    Stay_At_Home = "Stay at Home"
}

export enum Insurance {
    Uninsured = "Uninsured",
    Private = "Private",
    Public = "Public"
}

export enum Accessibility {
    Speech = "Speech",
    Vision = "Vision",
    Hearing = "Hearing",
    Mental = "Mental",
    DigitalLiteracy = "Digital Literacy"
}

export enum Language {
   English = "English",
   Spanish = "Spanish",
   Portuguese = "Portuguese",
   Chinese = "Chinese",
   Vietnamese = "Vietnamese",
   Arabic = "Arabic",
   Haitian_Creole = "Haitian Creole"
}

export enum ResourceCategory {
    Childcare = "Childcare", 
    Healthcare = "Healthcare", 
    FinancialHelp = "Financial Help", 
    ImmigrationAssistance = "Immigration Assistance", 
    Housing = "Housing"
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
