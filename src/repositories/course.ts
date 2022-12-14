import { DB, DbCollections, getClient } from "../database";
import Cource from "../model/course";
import { ObjectId } from "bson";

const courceRepositories = {
  create: async (cource: Cource) => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.course);
    const result = await collection.insertOne(cource);
    client.close();
    return result;
  },
  get: async () => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.course);
    const result = await collection.find().toArray();
    client.close();
    return result;
  },
  getDrawCourse: async (id: string) => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.course);
    const result = await collection.findOne({
      _id: new ObjectId(id),
    });
    client.close();
    return result;
  },
  addUnitToCourse: async (id: string, data: ObjectId) => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.course);
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $push: {
          unit: data,
        },
        $currentDate: { lastModified: true },
      }
    );
    client.close();
    return result;
  },
};
export default courceRepositories;
