import { Response } from "express";
import { responseApi } from "../../common";
import { AuthRequest } from "../../common/AuthRequest";
import { Lesson } from "../../model/lesson";
import unitRepositories from "../../repositories/unit";
import courseService from "../../service/course";

const lessonController = {
  create: async (req: AuthRequest, res: Response) => {
    try {
      const idUnit = req.params.id;
      const idUser = req.authUser.id;
      const lessonInfo = req.body;

      const unit = await unitRepositories.getDrawUnit(idUnit);
      if (!unit) {
        throw new Error("Course not found");
      }
      if (idUser != unit.author) {
        throw new Error("Permission denied");
      }

      const result = await courseService.createLesson(idUnit, idUser, lessonInfo);

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
