import type { NextApiRequest, NextApiResponse } from "next";
import mongoDbInteractor from "../../../db/mongoDbInteractor";
import { ObjectId, WithId } from "mongodb";
import { Admin, ResponseMessage } from "../../../models/types";
import { ADMIN_COLLECTION } from "../../../models/constants";
import { isInviteValid } from "../../../util/utils";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<WithId<Admin> | ResponseMessage>
) {
    if (req.method == "POST") {
        await createAdminAccount(req, res);
    }
    else if (req.method == "GET") {
        await readAdminAccount(req, res);
    }
    else if (req.method == "PUT") {
        await updateAdminAccount(req, res);
    }
    else if (req.method == "DELETE") {
        await deleteAdminAccount(req, res);
    }
    else {
        res.status(400).json({ message: `Invalid method type ${req.method} for handling admin accounts` })
    }
}

async function createAdminAccount(
    req: NextApiRequest,
    res: NextApiResponse<WithId<Admin> | ResponseMessage>
) {
    try {
        const inviteId: string = req.body.inviteId
        if(await isInviteValid(inviteId)) {
            const admin = await mongoDbInteractor.createDocument<WithId<Admin>>(req.body, ADMIN_COLLECTION)
            res.status(200).json(admin)
        } else {
            res.status(401).json({message: "\nInvite is invalid or expired.\nPlease ask for a new invite."})
        }
    } catch (e) {
        res.status(400).json({ message: "Failed to insert admin document into MongoDB collection" })
    }
}

async function readAdminAccount(
    req: NextApiRequest,
    res: NextApiResponse<WithId<Admin> | ResponseMessage>
) {
    try {
        const admin = await mongoDbInteractor.getDocument<WithId<Admin>>(ADMIN_COLLECTION, req.body["_id"])
        res.status(200).json(admin)
    } catch (e) {
        res.status(400).json({ message: "Failed to retrieve admin document from MongoDB collection" })
    }
}

async function updateAdminAccount(
    req: NextApiRequest,
    res: NextApiResponse<WithId<Admin> | ResponseMessage>
) {
    try {
        const filter = { _id: new ObjectId(req.body["_id"]) }
        const admin = await mongoDbInteractor.updateDocument<WithId<Admin>>(ADMIN_COLLECTION, filter, req.body["replacement"])
        res.status(200).json(admin)
    } catch (e) {
        res.status(400).json({ message: "Failed to update admin document in MongoDB collection" })
    }
}

async function deleteAdminAccount(
    req: NextApiRequest,
    res: NextApiResponse<WithId<Admin> | ResponseMessage>
) {
    try {
        const filter = { _id: new ObjectId(req.body["_id"]) }
        const deleteResult = await mongoDbInteractor.deleteDocument<WithId<Admin>>(ADMIN_COLLECTION, filter)
        if (deleteResult.acknowledged && deleteResult.deletedCount === 1) {
            res.status(200).json({ message: "Successfully deleted admin document from MongoDB collection" })
        }
        res.status(400).json({ message: "Failed to delete admin document from MongoDB collection - failed acknowledgement or incorrect deletedCount" })
    } catch (e) {
        res.status(400).json({ message: "Failed to delete admin document from MongoDB collection - exception thrown" })
    }
}
