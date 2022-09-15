import { Role } from "../constants/role";

export interface User {
  email: string;
  role: Role;
}

export type UID = string;

export interface Event {
    name: string;
    location: string; // TODO: make this its own type, or at least able to support all location possibilities
    description: string;
    startTime: Date;
    endTime: Date;
    attendees: UID[];
}
