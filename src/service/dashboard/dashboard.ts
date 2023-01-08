import courceRepositories from "../../repositories/course";
import enrollRepositories from "../../repositories/enroll";
import commentRepositories from "../../repositories/comment";
import userRepositories, { OptionFind } from "../../repositories/user";
import { Obj } from "../../interface";

const dashboardService = {
  getDashboard: async () => {
    try {
      const listUsers = await userRepositories.getUsersDashboard();
      if (!listUsers) {
        throw new Error("Failed to get Users");
      }
      const userdb = {};
      listUsers.forEach((user) => {
        if (!userdb[user.role]) {
          userdb[user.role] = [user];
        } else {
          userdb[user.role].push(user);
        }
      });
      return userdb;
    } catch (error) {
      if (error) {
        throw new Error(error.message);
      }
      throw new Error("Fail to get dashboard!");
    }
  },
};

export default dashboardService;
