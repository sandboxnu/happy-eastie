import { INVITE_COLLECTION } from "../models/constants";
import { Invite } from "../models/types2";
import mongoDbInteractor from "./mongoDbInteractor";

export async function isInviteValid(inviteId: string) {
    const invites = await mongoDbInteractor.getDocuments<Invite>(INVITE_COLLECTION,{_id: inviteId})

    return invites.length > 0 && invites[0].expiration.getTime() >= Date.now()
}