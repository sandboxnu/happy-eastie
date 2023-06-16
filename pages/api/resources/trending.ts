import { withIronSessionApiRoute } from "iron-session/next/dist";
import { NORMAL_IRON_OPTION, RESOURCE_COLLECTION } from "../../../models/constants";
import mongoDbInteractor from "../../../db/mongoDbInteractor";
import { Resource, ResponseMessage } from "../../../models/types";
import { NextApiResponse } from "next";
import { ObjectId, WithId } from "mongodb";

const handler = withIronSessionApiRoute(async function (req,res: NextApiResponse<WithId<Resource>[] | ResponseMessage>) {
    if(req.method === "GET") {
        const trendingResources = (await mongoDbInteractor.getDocuments<Resource>(RESOURCE_COLLECTION, {"trendingInfo.isTrending": true})).sort((a,b) => a.trendingInfo!.trendingDate.getTime() >= b.trendingInfo!.trendingDate.getTime()? -1 : 1) //these should have trending info because we filtered on them

        res.status(200).json(trendingResources)
        return
    } else {
        const user = req.session.user
        if (!user || !user.isAdmin) {
            res.status(401).json({message: "User not authorized"})
            return
        }
        const id = req.body.id

        if(typeof id !== "string") {
            res.status(401).json({message: "Resource ID is invalid or not present in request body."})
            return
        }
        if(req.method === "POST") {
            const result = await mongoDbInteractor.updateDocument<Resource>(RESOURCE_COLLECTION, {_id: new ObjectId(id)}, { $set: {trendingInfo: {trendingDate: new Date(), isTrending: true}}})

            if(result.modifiedCount !== 1) {
                res.status(401).json({message: `Could not find resource with ID ${id}`})
                return
            } else {
                res.status(201).json({message: 'Successfully set resource to trending.'})
                return
            }
        } else if(req.method === "DELETE") {
            const result = await mongoDbInteractor.updateDocument<Resource>(RESOURCE_COLLECTION, {_id: new ObjectId(id)}, { $set: {"trendingInfo.isTrending": false}})

            if(result.modifiedCount !== 1) {
                res.status(401).json({message: `Could not find resource with ID ${id}`})
                return
            } else {
                res.status(201).json({message: `Successfully removed resource from trending.`})
                return
            }
        } else {
            res.status(404).json({message: `Unsupported method type '${req.method}'.`})
        }
    }
},NORMAL_IRON_OPTION)

