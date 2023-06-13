import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseMessage } from "../../../models/types2";
import { INVITE_COLLECTION, NORMAL_IRON_OPTION } from "../../../models/constants";
import { sendEmail } from "../../../db/mailService";
import mongoDbInteractor from "../../../db/mongoDbInteractor";
import crypto from "crypto"

//apparently email address validation is a pain. this regex taken from here:
//https://stackoverflow.com/a/1373724
const emailValidator = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/


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

            if(!emailValidator.test(email)) {
                res.status(400).json({message: "Invalid e-mail. Please enter an e-mail in the format example@happyeastie.org."})
                return
            }

            try {
                const _id = crypto.randomUUID()
                //link expires after 1 hour
                const expiration = new Date(Date.now() + 1*60*60*1000)
                const link = `http://${req.headers.host}/admin/signUp/${_id}`

                await mongoDbInteractor.createDocument({_id, expiration},INVITE_COLLECTION)

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