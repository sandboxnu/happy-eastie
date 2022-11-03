import {  Db, DeleteResult, Document, Filter, FilterOperations, MongoClient, OptionalUnlessRequiredId, WithId, WithoutId } from "mongodb";
import { Resource } from "../models/types";

const uri = "mongodb+srv://happy-eastie:password@cluster0.ekxdybn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export default class MongoDbInteractor {
    async getDocument<T extends Document>(collectionName : string, id : string) : Promise<WithId<T> | null> {
        try {
            await client.connect();
            const database = client.db('happy-eastie');
            const results = await database.collection<T>(collectionName).findOne({ _id: id } as Filter<T>);
            // const resources = await results.toArray();
            console.log("reeeeee ", results);
            await client.close();
            return results;
        } catch (e) {
            console.log(e)
            await client.close();
            return null
        } 
    }

    async getDocuments<T extends Document>(collectionName : string) : Promise<Array<WithId<T>>> {
        try {
            await client.connect();
            const database = client.db('happy-eastie');
            const resources = database.collection<T>(collectionName);
            const resourceList = resources.find();
            return await resourceList.toArray();
        } catch (e) {
            console.log(e)
            return []
        } 
    }

    async createDocument<T extends Document>(doc : OptionalUnlessRequiredId<T>, collectionName : string) : Promise<T> {
        try {
            const database = client.db('happy-eastie');
            const result = await database.collection<T>(collectionName).insertOne(doc);
            await client.close();
            return doc as T;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async createDocuments<T extends Document>(doc : Array<OptionalUnlessRequiredId<T>>, collectionName : string) : Promise<Array<T>> {
        try {
            const database = client.db('happy-eastie');
            const result = await database.collection<T>(collectionName).insertMany(doc);
            await client.close();
            return doc as Array<T>;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async updateDocument<T extends Document>(collectionName : string, filter : Filter<T>, replacement : WithoutId<T>) : Promise<any>  {
        try {
            const database = client.db('happy-eastie');
            const result = await database.collection<T>(collectionName).replaceOne(filter, replacement);
            client.close();
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async deleteDocument<T extends Document>(collectionName : string, filter : Filter<T>) : Promise<DeleteResult> {
        try {
            const database = client.db('happy-eastie');
            const result = await database.collection<T>(collectionName).deleteOne(filter);
            client.close();
            return result;
        } catch (e) {
            console.log(e);
            throw e;
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