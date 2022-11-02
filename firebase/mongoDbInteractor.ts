import {  MongoClient, WithId } from "mongodb";
import { Resource } from "../models/types";

const uri = "mongodb+srv://happy-eastie:<password>@cluster0.ekxdybn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export default class MongoDbInteractor {
    db : MongoClient = client

    async getDocument() : Promise<WithId<Resource> | null> {
        try {
            const database = client.db('happy-eastie');
            const resources = database.collection<Resource>('resources');
            const resource = await resources.findOne()
            await client.close();
            return resource
        } catch (e) {
            console.log(e)
            await client.close();
            return null
        } 
    }

    async getDocuments() : Promise<Array<WithId<Resource>>> {
        try {
            const database = client.db('happy-eastie');
            const resources = database.collection<Resource>('resources');
            const resourceList = await resources.find()
            return resourceList.toArray()
        } catch (e) {
            console.log(e)
            return []
        } 
    }
}


/*
async function run() {
    try {
        const db = client.db('happy-eastie')
        const resources = db.collection('resources')
        const resource = await resources.findOne()
        console.log(resource)
    } catch(err) {
        console.log(err)
    }
    await client.close()
}

run()
*/