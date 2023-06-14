import type { NextApiRequest, NextApiResponse } from "next";
import mongoDbInteractor from "../../../../db/mongoDbInteractor";
import { Filter, WithId } from "mongodb";
import { Admin, ResponseMessage } from "../../../../models/types2";
import { ADMIN_COLLECTION, INVITE_COLLECTION, LOGIN_IRON_OPTION } from "../../../../models/constants";
import { withIronSessionApiRoute } from "iron-session/next";
import { isInviteValid } from "../../../../db/utils";

export default withIronSessionApiRoute(async function handler(
    req: NextApiRequest,
    res: NextApiResponse<WithId<Admin> | ResponseMessage>
) {
    if (req.method == "POST") {
        if (req.body["type"] == "login") {
            await handleLogIn(req, res)
        } else if (req.body["type"] == "signup") {
            await handleSignUp(req, res)
        } else if (req.body["type"] == "logout") {
            await handleLogOut(req, res)
        } else {
            res.status(400).json({ message: "Unable to authenticate user" })
        }
    }
}, LOGIN_IRON_OPTION)

async function handleLogOut(req: NextApiRequest, res: NextApiResponse<ResponseMessage>) {
    if (req.session) {
        req.session.destroy()
        res.status(200).json({ message: "log out successfully" })
    }
}

async function handleLogIn(req: NextApiRequest, res: NextApiResponse<WithId<Admin> | ResponseMessage>) {
    const filter: Filter<Admin> = { email: req.body["email"] }
    let accounts: WithId<Admin>[] = await mongoDbInteractor.getDocuments<Admin>(ADMIN_COLLECTION, filter)
    if (accounts.length == 0) {
        res.status(400).json({ message: "Invalid credential" })
    } else if (accounts.length > 1) {
        res.status(500).json({ message: "Unable to login with this email." })
    } else {
        // found a matching email
        const hashedPassword = accounts[0]["hashedPassword"]
        if (hashedPassword !== req.body["hashedPassword"]) {
            res.status(400).json({ message: "Invalid credential" })
            return;
        } else {
            req.session.user = {
                email: req.body["email"],
                isAdmin: true,
            };
            await req.session.save();
            res.status(200).json(accounts[0])
            return;
        }
    }
}

async function handleSignUp(req: NextApiRequest, res: NextApiResponse<WithId<Admin> | ResponseMessage>) {
    const filter: Filter<Admin> = { email: req.body["email"] }
    let accounts: Admin[] = await mongoDbInteractor.getDocuments<Admin>(ADMIN_COLLECTION, filter)
    if (accounts.length == 0) {
        const { type, inviteId, ...adminProfile } = req.body;
        const requestBody = adminProfile

        try {
            if(await isInviteValid(inviteId)) {
                const admin = await mongoDbInteractor.createDocument<WithId<Admin>>(requestBody, ADMIN_COLLECTION)
                res.status(200).json(admin)
                await mongoDbInteractor.deleteDocument(INVITE_COLLECTION, {_id: inviteId})
            } else {
                res.status(401).json({message: "Invite is invalid or expired. Please ask for a new invite."})
            }
        } catch (e) {
            res.status(400).json({ message: "Failed to insert admin document into MongoDB collection" })
        }

    } else {
        res.status(400).json({ message: "Email address was already taken." })
    }
}

