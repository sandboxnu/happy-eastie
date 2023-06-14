import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { Invite, ResponseMessage } from "../../../models/types";
import { INVITE_COLLECTION, NORMAL_IRON_OPTION } from "../../../models/constants";
import { sendEmail } from "../../../util/mailService";
import mongoDbInteractor from "../../../db/mongoDbInteractor";
import crypto from "crypto"
import { createSingleUseLink, emailRegex, isValidEmail } from "../../../util/utils";


export default withIronSessionApiRoute(async function handler(
    req: NextApiRequest, 
    res: NextApiResponse<ResponseMessage>) {
        if(req.method === "POST") {
            const user = req.session.user
            if (!user || !user.isAdmin) {
                res.status(401).json({message: "User not authorized"})
                return
            }
            
            const email = req.body["email"]

            if(typeof email !== "string") {
                res.status(400).json({message: "E-mail must be a string."})
                return
            }

            if(!isValidEmail(email)) {
                res.status(400).json({message: "Invalid e-mail. Please enter an e-mail in the format example@happyeastie.org."})
                return
            }

            try {
                const link = await createSingleUseLink(INVITE_COLLECTION, req.headers.host ?? 'localhost:3000', '/admin/signUp/')

                await sendEmail(email, "You have been invited as an admin to HappyEastie!", `<p>Someone at HappyEastie has invited you to become an admin. Visit the link below or copy and paste it into your browser in order to create an account. The link expires after 1 hour.</p>
                <br/>
                <a href='${link}'>${link}</a>`);
            } catch (e) {
                console.error(e)
                res.status(500).json({message: `An error occured: ${JSON.stringify(e)}`})
                return
            }

            res.status(201).json({message: `E-mail invite sent to ${email}. Ensure they check their spam or junk folder in case they do not see it, and ensure their e-mail address was typed correctly.`});
            
        } else {
            res.status(404).json({message: "Invalid request method."})
        }
    }, NORMAL_IRON_OPTION);