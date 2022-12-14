import { NextFunction, Request, Response } from "express";
import { responseApi } from "../../common";

const lessonMiddleWare = {
  create: (req: Request, res: Response, next: NextFunction) => {
    try {
      const idCourse = req.params.id;
      if (!idCourse) {
        throw new Error("Id course is required!");
      }
      next();
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
export default lessonMiddleWare;
