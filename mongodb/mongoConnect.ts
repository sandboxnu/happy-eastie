import { MongoClient } from "mongodb"; 
// Replace the uri string with your connection string.
const uri = "mongodb+srv://happy-eastie:XTgZ9LoF92LxzzZO@cluster0.ekxdybn.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);

export const mongoConnect = async () => {
  try {
    await client.connect();
    client.db("happy-eastie");
    return client;
  } catch (err) {
    console.log("Can't connect to MongoDb " + err);
  }
}