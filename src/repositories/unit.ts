import { DB, DbCollections, getClient } from "../database";
import { Unit } from "../model/unit";
import { ObjectId } from "bson";

const unitRepositories = {
  create: async (unit: Unit) => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.unit);
    const result = await collection.insertOne(unit);
    client.close();
    return result;
  },
  get: async () => {
    // const client = await getClient();
    // const collection = client.db(DB).collection(DbCollections.course);
    // const result = await collection.find().toArray();
    // client.close();
    // return result;
  },
  getDrawCourse: async (id: string) => {
    // const client = await getClient();
    // const collection = client.db(DB).collection(DbCollections.course);
    // const result = await collection.findOne({
    //   _id: new ObjectId(id),
    // });
    // client.close();
    // return result;
  },
};
export default unitRepositories;
