import { INVITE_COLLECTION } from "../models/constants";
import { Invite } from "../models/types2";
import mongoDbInteractor from "../db/mongoDbInteractor";

export async function isInviteValid(inviteId: string) {
    const invites = await mongoDbInteractor.getDocuments<Invite>(INVITE_COLLECTION,{_id: inviteId})

    return invites.length > 0 && invites[0].expiration.getTime() >= Date.now()
}

//apparently email address validation is a pain. this regex taken from here:
//https://stackoverflow.com/a/1373724
export const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

export function isValidEmail(email: string) {
    return emailRegex.test(email)
}