import { DB, DbCollections, getClient } from "../database";
import Cource from "../model/course";

const courceRepositories = {
  create: async (cource: Cource) => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.cource);
    const result = await collection.insertOne(cource);
    client.close();
    return result;
  },
  get: async () => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.cource);
    const result = await collection.find().toArray();
    client.close();
    return result;
  },
};
export default courceRepositories;
