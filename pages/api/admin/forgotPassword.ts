import { NextApiHandler } from "next"

const handler : NextApiHandler = (req, res) => {
    const email: string = req.body?.email ?? "";
    
}

export default handler