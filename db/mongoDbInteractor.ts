import { Db, DeleteResult, Document, Filter, MongoClient, ObjectId, OptionalUnlessRequiredId, WithId, WithoutId } from "mongodb";

const uri = `mongodb+srv://happy-eastie:${process.env.PASSWORD}@cluster0.ekxdybn.mongodb.net/?retryWrites=true&w=majority`;
let client : MongoClient
export class MongoDbInteractor {
    
    async getDocument<T extends Document>(collectionName : string, id : string) : Promise<WithId<T>> {
        const tempClient : MongoClient = new MongoClient(uri)
        try {
            await tempClient.connect();
            const database = tempClient.db('happy-eastie');
            const results = database.collection(collectionName).find({ _id : new ObjectId(id)});
            const resources = (await results.toArray()) as WithId<T>[];
            await tempClient.close();
            return resources[0];
        } catch (e) {
            await tempClient.close()
            console.log(e)
            throw e
        } 
    }

    async getDistinctValues<T extends Document, U>(collectionName : string, fieldName: string) : Promise<Array<U>> {
        const tempClient : MongoClient = new MongoClient(uri)
        await tempClient.connect();
        const database = tempClient.db('happy-eastie');
        const values = await database.collection(collectionName).distinct(fieldName);
        await tempClient.close()
        return values;
    }

    async getDocuments<T extends Document>(collectionName : string, filter: Filter<T>) : Promise<Array<WithId<T>>> {
        const tempClient : MongoClient = new MongoClient(uri)
        try {
            await tempClient.connect();
            const database = tempClient.db('happy-eastie');
            const resources = database.collection<T>(collectionName).find(filter);
            const resourceList = await resources.toArray();
            await tempClient.close()
            return resourceList;
        } catch (e) {
            await tempClient.close()
            console.log(e)
            return []
        } 
    }

    async createDocument<T extends Document>(doc : OptionalUnlessRequiredId<T>, collectionName : string) : Promise<T> {
        try {
            await client.connect();
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
            await client.connect();
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
            await client.connect();
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
            await client.connect();
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

const mongoDbInteractor = new MongoDbInteractor()
export default mongoDbInteractor
