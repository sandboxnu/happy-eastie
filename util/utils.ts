import { FORGOT_PASSWORD_COLLECTION, INVITE_COLLECTION } from "../models/constants";
import { Invite, PasswordReset } from "../models/types";
import mongoDbInteractor from "../db/mongoDbInteractor";
import crypto from "crypto"

export async function isInviteValid(inviteId: string) {
    return isSingleUseSessionValid<Invite>(INVITE_COLLECTION, inviteId)
}

export async function isPasswordResetValid(resetId: string) {
    return isSingleUseSessionValid<PasswordReset>(FORGOT_PASSWORD_COLLECTION, resetId)
}
async function isSingleUseSessionValid<T extends {_id: string, expiration: Date}>(collection: string, id: string){
    const sessions = await mongoDbInteractor.getDocuments<T>(collection,{_id: id} as any) //seems to be a typescript bug, T is just here to enforce safety 
    //see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/46375

    return sessions.length > 0 && sessions[0].expiration.getTime() >= Date.now()
}

//apparently email address validation is a pain. this regex taken from here:
//https://stackoverflow.com/a/1373724
export const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

export function isValidEmail(email: string) {
    return emailRegex.test(email)
}

export async function createSingleUseLink(collectionName: string,host: string, path: string, otherProps: {[key: string]: unknown} = {}) {
    const _id = crypto.randomUUID()
    //link expires after 1 hour
    const expiration = new Date(Date.now() + 1*60*60*1000)
    const link = `http://${host}${path}${_id}`

    const session = {
        _id, expiration, ...otherProps
    }
    await mongoDbInteractor.createDocument(session,collectionName)

    return link
}