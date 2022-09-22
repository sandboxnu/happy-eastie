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

export interface Service {
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
}

export type Citizenship = "Undocumented" | "Non-Immigrant" | "Resident" | "Citizen" | "Eligible Non-Citizen";

export type Family = "Nuclear" | "Expecting" | "Extended" | "Single-Parent";

export type EmploymentStatus = "Currently Working" | "Seeking Employment" | "Studying" | "Stay at Home"

export type Insurance = "Uninsured" | "Private" | "Public"

export type Accessibility = "Speech" | "Vision" | "Hearing" | "Mental" | "Digital Literacy"