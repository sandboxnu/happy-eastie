import { IronSession } from "iron-session";

export interface SurveyAnswers {
    /**
     * OR relationship
     * If one category is in the array, show all resources with that category
     * 
     * If they send empty array, assume they want everything
     * 
     * Your matches: Most relevant based on what you answered
     * Additional matches: Things you might qualify for but did not ask for
     */
        /**
     * Variable name, not what will be shown on site
     */
    categories: string[];
    householdMembers: number;
    householdIncome: number;
    /**
     * If no answer provided, show all resources regardless of documentation
     */
    documentation?: boolean;
    /**
     * OR relationship
     * Use this just for ordering right now
     */
        /**
     * Variable name, not what will be shown on site
     */
    languages: string[];
    /**
     * same as languages, just for ordering
     */
        /**
     * Variable name, not what will be shown on site
     */
    accessibility: string[];
}

export type IncomeRange = {
    id: string;
    minimum: number;
    maximum: number;
}

export interface GeoJsonPoint {
    type: "Point",
    coordinates: number[]
}
export interface Resource {
    //Literally the name of the resource
    name: string;
    /**
     * General overview of resource, used in resource page
     * 
     * Put other things like eligibility in their proper property
     */
    description: string;
    /**
     * One sentence used in card description
     */
    summary: string;
    /**
     * Variable name, not what will be shown on site
     */
    category: string[];
    keywords?: string[];
    /**
     * Array where the index + 1 represents the number of household members, and the stored object represents the income range.
     * 
     * If there are more household members than the length of the array, use the last range in the array.
     */
    incomeByHouseholdMembers?: IncomeRange[];

    /**
     * Some resources require some form of GOVERNMENT ISSUED DOCUMENTATION
     * 
     * Default to false if not sure
     */
    documentationRequired: boolean;
    headerImageUrl?: string;
    website: string;
    /**
     * Phone and Email represent the communication for the resource in general, hopefully they can redirect to other lines if necessary
     */
    phone?: string;
    email?: string;

    /**
     * The single location of the main office that manages this program. This is a geopoint we use for the map.
     */
    location?: GeoJsonPoint;
    /**
     * Similar to location, except it's a string address just used for describing things.
     */
    address?: string;
        /**
     * Variable name, not what will be shown on site
     */
    availableLanguages: string[];
    /**
     * this resource fulfills these accessibility options
     */
        /**
     * Variable name, not what will be shown on site
     */
    accessibilityOptions?: string[];
    /**
     * Description of things you need to be eligible. Separate property so it's easier to format on the page.
     */
    /**
     * put documentation requirements here
     */
    eligibilityInfo?: string;
    
    trendingInfo?: TrendingInfo
}

type TrendingInfo = {
    isTrending: boolean,
    trendingDate: Date
}


export interface Admin {
    email: string;
    hashedPassword: string;
    salt: string;
}

export enum PermissionGroup {
    Admin = "Admin"
}

export type ResponseMessage = {
    message: string
}


export type User = {
    email: string, 
    isAdmin: boolean
}

declare module "iron-session" {
    interface IronSessionData {
        user: User
    }
}

export type Invite = {
    _id: string,
    expiration: Date
}

export type PasswordReset = {
    _id: string,
    expiration: Date,
    email: string
}