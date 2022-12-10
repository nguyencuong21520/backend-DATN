import { Request, Response } from "express";
import { responseApi } from "../../common";
import Cource from "../../model/course";
import courceRepositories from "../../repositories/course";

const courceController = {
  create: async (req: Request, res: Response) => {
    try {
      const {
        author,
        major,
        nameCource,
        img,
        summaryCource,
        videoThumbnail,
        courses,
        level,
      } = req.body;
      const cource = Cource.createCource(
        nameCource,
        major,
        author,
        img,
        summaryCource,
        videoThumbnail,
        courses,
        level
      );
      const newCource = await courceRepositories.create(cource);
      if (!newCource) {
        throw new Error("Đã có lỗi xảy ra");
      }
      responseApi(res, 200, {
        success: true,
        response: {
          message: "Created Cource!",
          data: cource,
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
  getCource: async (req: Request, res: Response) => {
    try {
      const result = await courceRepositories.get();
      responseApi(res, 200, {
        success: true,
        response: {
          message: "Success!",
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
export default courceController;
