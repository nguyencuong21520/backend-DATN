import { ObjectId } from "bson";
import { DB, DbCollections, getClient } from "../database";
import { User } from "../model/user";
import { STATUS_USER } from "../Enum";

export enum OptionFind {
  ID = "_id",
  EMAIL = "email",
  NUMBERPHONE = "numberphone",
}

interface conditionsSearch extends Object {
  username: string;
  page: number;
  amount: number;
  status: string;
}
const userRepositories = {
  create: async (user: User) => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.user);
    const result = await collection.insertOne(user);
    client.close();
    return result;
  },
  findOneBySingleField: async (option: OptionFind, field: string | number) => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.user);
    const result = await collection.findOne({
      [option]: option === OptionFind.ID ? new ObjectId(field) : field,
    });
    client.close();
    return result;
  },
  updateUser: async (id: string, data: User) => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.user);
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          img: data.img,
          phone: data.phone,
          username: data.username,
        },
        $currentDate: { lastModified: true },
      }
    );
    client.close();
    return result;
  },

  getUsers: async (conditions: conditionsSearch) => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.user);

    const { username, page, amount, status } = conditions;

    const result = await collection
      .find({
        username: { $regex: new RegExp(username, "i") },
        status: status,
      })
      .skip(amount * (page - 1))
      .limit(amount)
      .toArray();
    client.close();
    return { data: result, quantity: result.length };
  },
  updateUserAdmin: async (id: string, data: User) => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.user);
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: data,
        $currentDate: { lastModified: true },
      }
    );
    client.close();
    return result;
  },
  deleteUserAdmin: async (id: string) => {
    const client = await getClient();
    const collection = client.db(DB).collection(DbCollections.user);
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: STATUS_USER.DAT,
        },
        $currentDate: { lastModified: true },
      }
    );
    client.close();
    return result;
  },
};
export default userRepositories;
