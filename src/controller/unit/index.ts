import { info } from "console";
import { Request, Response } from "express";
import { responseApi } from "../../common";
import { AuthRequest } from "../../common/AuthRequest";
import { ROLE_USER, STATUS_USER } from "../../Enum/";
import Course from "../../model/course";
import courceRepositories from "../../repositories/course";

const unitController = {
  create: async (req: AuthRequest, res: Response) => {
    try {
      const idCourse = req.params.id;
      const idUser = req.authUser.id;
      const unitInfo = req.body

      const course = await courceRepositories.getDrawCourse(idCourse);
      if (!course) {
        throw new Error("Course not found");
      }
      if(idUser != course.author){
        throw new Error("Permission denied");
      }

      const result = await 


      responseApi(res, 200, {
        success: true,
        response: {
          message: "Get information success!",
          data: course,
        },
      });
    } catch (error) {
      responseApi(res, 500, {
        success: false,
        response: {
          message: error.message,
        },
      });
    }
  },
};
export default unitController;
