import type { NextApiRequest, NextApiResponse } from "next";
import {
  Resource,
} from "../../../models/types";
import mongoDbInteractor from "../../../db/mongoDbInteractor";
import { ObjectId, WithId } from "mongodb";
import { RESOURCE_COLLECTION } from "../../../models/constants";

type ResultMessage = {
    message: string
}
  
// this endpoint get resources by calling the methods on api/resources
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<WithId<Resource>[] | WithId<Resource> | ResultMessage>
  ) {
    // get request
    if (req.method === 'GET') {
        if (req.body["_id"]) {
            try {
                const resource = await mongoDbInteractor.getDocument<Resource>(RESOURCE_COLLECTION, req.body['_id']);
                if (!resource) {
                    res.status(400).json({message: "Document with the given ID not found"})
                }
                res.status(200).json(resource)

            } catch (error : any) {
                console.log(error)
                res.status(400).json({message: "Failed to get a document with the given ID"})
            }
        } else {
            try {
                const resources = await mongoDbInteractor.getDocuments<Resource>(RESOURCE_COLLECTION, {})
                res.status(200).json(resources)
            } catch (error) {
                console.log(error)
                res.status(400).json({message: "Failed to get documents in MongoDb"})
            }
        }
    } else if (req.method === 'POST') {
        // do we allow duplicate names?
        try {
            const resource = await mongoDbInteractor.createDocument<WithId<Resource>>(req.body, RESOURCE_COLLECTION)
            res.status(200).json(resource)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: "Failed to create a document in MongoDb"})
        }
    } else if (req.method === 'PUT') {
        try {
            const filter = {_id: new ObjectId(req.body.data["_id"])}
            const resource = await mongoDbInteractor.updateDocument(RESOURCE_COLLECTION, filter, req.body.data["replacement"])
            res.status(200).json(resource)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: "Failed to update a document"})
        }
    } else if (req.method === 'DELETE') {
        try {
            const filter = {_id: new ObjectId(req.body["_id"])}
            const result = await mongoDbInteractor.deleteDocument(RESOURCE_COLLECTION, filter)
            if (!result.acknowledged || result.deletedCount != 1) {
                res.status(400).json({message: "Failed to delete a document"})
            } 
            res.status(200).json({message: "Successfully delete the resource"})
        } catch (error) {
            console.log(error)
            res.status(400).json({message: "Error in MongoDb interactor when deleting the document"})
        }
    } else {
        res.status(400).json({message: "Request not supported"})
    }
}
  