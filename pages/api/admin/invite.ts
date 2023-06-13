import { withIronSessionApiRoute } from "iron-session/next/dist";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseMessage } from "../../../models/types2";
import { NORMAL_IRON_OPTION } from "../../../models/constants";
import { sendEmail } from "../../../db/mailService";

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

            try {
                await sendEmail(email, "You have been invited as an admin to HappyEastie!", "good job lmfao");
            } catch (e) {
                res.status(500).json({message: `An error occured: ${e}`})
                return
            }

            res.status(201).json({message: `E-mail invite sent to ${email}. Ensure they check their spam or junk folder in case they do not ese it.`});
            
        } else {
            res.status(404).json({message: "Invalid request method."})
        }
    }, NORMAL_IRON_OPTION);