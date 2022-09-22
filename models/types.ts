import { DocumentData } from "firebase/firestore";
export interface Service extends DocumentData {
  name: string;
  description: string;
  incomeLevel: number;
  employed: boolean
}
