import { DB, DbCollections, getClient } from "../database";
import { Lesson } from "../model/lesson";
import { ObjectId } from "bson";

const lessonRepositories = {
  create: async (lesson: Lesson) => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.lesson);
    const result = await collection.insertOne(lesson);
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
export default lessonRepositories;
