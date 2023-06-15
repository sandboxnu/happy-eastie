import { NextApiHandler } from "next"
import { createSingleUseLink, isValidEmail } from "../../../util/utils";
import mongoDbInteractor from "../../../db/mongoDbInteractor";
import { ADMIN_COLLECTION, FORGOT_PASSWORD_COLLECTION, LOCALHOST } from "../../../models/constants";
import { Admin, ResponseMessage } from "../../../models/types";
import { sendEmail } from "../../../util/mailService";

const handler : NextApiHandler<ResponseMessage> = async (req, res) => {
    const email: string = req.body["email"] ?? "";

    if(!isValidEmail(email)) {
        res.status(401).json({message: "E-mail is invalid."})
        return
    }

    const accounts = await mongoDbInteractor.getDocuments<Admin>(ADMIN_COLLECTION, {email})

    if(accounts.length <= 0) {
        res.status(401).json({message: "Sorry, we couldn't find an account associated with this email address."})
        return
    }

    const link = await createSingleUseLink(FORGOT_PASSWORD_COLLECTION, req.headers.host ?? LOCALHOST, "/admin/resetPassword/",{email})

    await sendEmail(email, "Request to reset password",`<p>There was a request to reset the password to your HappyEastie admin account. If this was not you, please disregard this email. You can reset your password at the following link:</p>
    <br/>
    <a href="${link}">${link}</a>`)

    res.status(201).json({message: `E-mail sent to ${email}. Please check your spam or junk folder if you did not receive anything.`})
}

export default handler