// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";
const client = new MongoClient(uri);

class MongoDbInteractor {
    async db() {
        await client.connect();
        return client.db('happy-eastie');
    }
    async getResources(filter?: Filter) : Promise<Reource[]>{
        return (await this.resourcesCollection())
        .find(filter)
        .toArray();
    }
    async resourcesCollection() : Promise<Collection<Resource>>{
        return (await this.db()).collection<Resource>("resources");
    }
    async getResourceById(id: string) : Promise<Resource>{
        return (await this.resourcesCollection())
        .findOne({_id: id});
    }
}

export const mi = new MongoDbInteractor();