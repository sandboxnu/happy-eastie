import type { NextApiRequest, NextApiResponse } from "next";
import mongoDbInteractor from "../../../../db/mongoDbInteractor";
import { Filter, WithId } from "mongodb";
import { Admin, ResponseMessage } from "../../../../models/types2";
import { ADMIN_COLLECTION, IRON_OPTION, IRON_OPTION_PERM } from "../../../../models/constants";
import { withIronSessionApiRoute } from "iron-session/next";


async function handler(
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
            res.status(400).json({message: "Unable to authenticate user"})
        }
    }
}

async function handleLogOut(req : NextApiRequest, res: NextApiResponse<ResponseMessage>) {
    if (req.session) {
        req.session.destroy()
        res.status(200).json({message: "log out successfully"})
    } 
}

async function handleLogIn(req : NextApiRequest, res: NextApiResponse<WithId<Admin> | ResponseMessage>) {
    const filter : Filter<Admin> = {email: req.body["email"]}
    let accounts : WithId<Admin>[] = await mongoDbInteractor.getDocuments<Admin>(ADMIN_COLLECTION, filter)
    if (accounts.length == 0) {
        res.status(400).json({message: "Invalid credential"})
    } else if (accounts.length > 1) {
        res.status(500).json({message: "Unable to login with this email."})
    } else {
        // found a matching email
        const hashedPassword = accounts[0]["hashedPassword"]
        if (hashedPassword !== req.body["hashedPassword"]) {
            console.log("input ", req.body["hashedPassword"])
            console.log("in db ", hashedPassword)
            res.status(400).json({message: "Invalid credential"})
            return;
        } else {
            req.session.user = {
                email: req.body["email"],
                isAdmin: true
            };
            if (req.body["keepSignedIn"] == true) {
                console.log("keeped me signed in")
            }
            await req.session.save();
            res.status(200).json(accounts[0])
            return;
        }
    }
}

async function handleSignUp(req : NextApiRequest, res: NextApiResponse<WithId<Admin> | ResponseMessage>) {
    const filter : Filter<Admin> = {email: req.body["email"]}
    let accounts : Admin[] = await mongoDbInteractor.getDocuments<Admin>(ADMIN_COLLECTION, filter)
    if (accounts.length == 0) {
        const { type, ...adminProfile } = req.body;
        const requestBody = adminProfile
        
        const requestSettings: RequestInit = {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
        };
        const response: Response = await fetch("/api/admin", requestSettings);
        const result = await response.json();
        res.status(result.status).json(result)
    } else {
        res.status(400).json({message: "Email address was already taken."})
    }
}

export default withIronSessionApiRoute(handler, IRON_OPTION)