import { DB, DbCollections, getClient } from "../database";

import { ObjectId } from "bson";

const pipeline = [
  {
    $unwind: {
      path: "$student",
    },
  },
  {
    $lookup: {
      from: "user",
      localField: "student.userId",
      foreignField: "_id",
      as: "alo",
    },
  },
  {
    $group: {
      _id: "$_id",
      idClass: {
        $first: "$idClass",
      },
      listStudent: {
        $push: {
          user: {
            $first: "$alo",
          },
          time: "$student.time",
        },
      },
    },
  },
  {
    $project: {
      _id: 1,
      idComment: 1,
      listStudent: {
        user: {
          _id: 1,
          username: 1,
          role: 1,
          status: 1,
          img: 1,
          email: 1,
          phone: 1,
          lastModified: 1,
        },
        time: 1,
      },
    },
  },
];
const enrollRepositories = {
  create: async (enroll: any) => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.enroll);
    const result = await collection.insertOne(enroll);
    client.close();
    return result;
  },
  getAll: async (id: ObjectId) => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.enroll);

    const result = await collection
      .aggregate([
        {
          $match: {
            idClass: id,
          },
        },
        ...pipeline,
      ])
      .toArray();
    client.close();
    return result;
  },
};
export default enrollRepositories;
