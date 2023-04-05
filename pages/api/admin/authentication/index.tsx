import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import mongoDbInteractor from "../../../../db/mongoDbInteractor";
import { Filter, WithId } from "mongodb";
import { Admin, ResponseMessage } from "../../../../models/types2";
import { ADMIN_COLLECTION } from "../../../../models/constants";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";


async function handler(
    req: NextApiRequest,
    res: NextApiResponse<WithId<Admin> | ResponseMessage>
) {
    if (req.method == "POST") {
        if (req.body["type"] == "login") {
            await handleLogIn(req, res)
        } else if (req.body["type"] == "signup") {
            await handleSignUp(req, res)
        } else {
            res.status(400).json({message: "Unable to authenticate user"})
        }
    }
}

async function handleLogIn(req : NextApiRequest, res: NextApiResponse<WithId<Admin> | ResponseMessage>) {
    const filter : Filter<Admin> = {email: req.body["email"]}
    let accounts : WithId<Admin>[] = await mongoDbInteractor.getDocuments<Admin>(ADMIN_COLLECTION, filter)
    if (accounts.length == 0) {
        res.status(400).json({message: "Invalid credential"})
    } else if (accounts.length > 1) {
        res.status(500).json({message: "Unable to login with this email."})
    }
    const hashedPassword = accounts[0]["hashedPassword"]
    if (hashedPassword !== req.body["hashedPassword"]) {
        res.status(400).json({message: "Invalid credential"})
    } else {
        res.status(200).json(accounts[0])
        req.session.user = {
            username: "test@gmail.com",
            isAdmin: true
        };
        await req.session.save();
        res.send({ ok: true });
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

const ironOptions = {
    cookieName: "MY_APP_COOKIE",
    password: "yPo4T7apfbdvctV1Bso1oAndQH9qwC94",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
  },
}


export default withIronSessionApiRoute(handler, ironOptions)