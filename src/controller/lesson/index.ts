import {  Response } from "express";
import { responseApi } from "../../common";
import { AuthRequest } from "../../common/AuthRequest";
import { ROLE_USER, STATUS_USER } from "../../Enum/";
import { Lesson } from "../../model/lesson";
import courceRepositories from "../../repositories/course";
import courseService from "../../service/course";

const lessonController = {
  create: async (req: AuthRequest, res: Response) => {
    try {
      const idCourse = req.params.id;
      const idUser = req.authUser.id;
      const unitInfo = req.body;

      const course = await courceRepositories.getDrawCourse(idCourse);
      if (!course) {
        throw new Error("Course not found");
      }
      if (idUser != course.author) {
        throw new Error("Permission denied");
      }

      const result = await courseService.createUnit(idCourse, unitInfo);

      responseApi(res, 200, {
        success: true,
        response: {
          message: "Create Unit success!",
          data: result,
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
export default lessonController;
