import { NextApiHandler } from "next";
import { Admin, PasswordReset, ResponseMessage } from "../../../models/types";
import { isPasswordResetValid } from "../../../util/utils";
import mongoDbInteractor from "../../../db/mongoDbInteractor";
import { ADMIN_COLLECTION, FORGOT_PASSWORD_COLLECTION } from "../../../models/constants";

const handler : NextApiHandler<ResponseMessage> = async (req, res) => {
    if(req.method === "POST" && typeof req.body['resetId'] === "string" && typeof req.body['hashedPassword'] === "string") {

        const resetId = req.body['resetId']
        const hashedPassword = req.body["hashedPassword"]

        if(!await isPasswordResetValid(resetId)) {
            res.status(404).json({message: 'Password reset link has expired. Please try again.'})
            return
        }

        const passwordReset = await mongoDbInteractor.getDocumentByDirectId<PasswordReset>(FORGOT_PASSWORD_COLLECTION, resetId)


        await Promise.all([
            mongoDbInteractor.updateDocument<Admin>(ADMIN_COLLECTION, {email: passwordReset.email}, {$set: {hashedPassword}}),
            mongoDbInteractor.deleteDocument<PasswordReset>(FORGOT_PASSWORD_COLLECTION, {_id: resetId})])

        res.status(201).json({message: `Password successfully updated for ${passwordReset.email}.`});
        
    } else {
        res.status(404).json({message: "Invalid request method."})
    }
}

export default handler