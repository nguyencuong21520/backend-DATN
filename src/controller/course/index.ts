import { Request, Response } from "express";
import { responseApi } from "../../common";
import { AuthRequest } from "../../common/AuthRequest";
import { ObjectId } from "bson";
import { ROLE_USER, STATUS_COURSE } from "../../Enum/";
import Course from "../../model/course";
import courceRepositories from "../../repositories/course";
import courseService from "../../service/course";

const courceController = {
  create: async (req: AuthRequest, res: Response) => {
    try {
      const { major, nameCourse, img, summaryCourse, videoThumbnail, level } =
        req.body;
      const roleAuth = req.authUser.role;
      const idAuth = new ObjectId(req.authUser.id);

      if (roleAuth === ROLE_USER.TC || roleAuth === ROLE_USER.AD) {
        const course = Course.createCourse(
          nameCourse,
          major,
          idAuth,
          img,
          summaryCourse,
          videoThumbnail,
          [],
          level,
          [],
          [],
          new Date(),
          STATUS_COURSE.AT
        );
        const newCourse = await courceRepositories.create(course);
        if (!newCourse) {
          throw new Error("Đã có lỗi xảy ra");
        }
        responseApi(res, 200, {
          success: true,
          response: {
            message: "Created Cource!",
            data: newCourse,
          },
        });
      } else {
        throw new Error("Permission denied");
      }
    } catch (error) {
      responseApi(res, 500, {
        success: false,
        response: {
          message: error.message,
        },
      });
    }
  },
  getCourse: async (req: Request, res: Response) => {
    try {
      const result = await courceRepositories.getAll(false);
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
  getCourseAuth: async (req: AuthRequest, res: Response) => {
    try {
      const roleAuth = req.authUser.role;
      const roleId = req.authUser.id;

      if (!roleAuth) {
        throw new Error("Missing user role");
      }
      if (!roleId) {
        throw new Error("Missing user id");
      }

      let result = null;
      if (roleAuth === ROLE_USER.AD) {
        result = await courceRepositories.getAll(true);
      }
      if (roleAuth === ROLE_USER.ST || roleAuth === ROLE_USER.TC) {
        result = await courseService.studentGetCourse(roleId);
      }

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
  mapDoneCourse: async (req: AuthRequest, res: Response) => {
    try {
      const roleAuth = req.authUser.role;
      const roleId = req.authUser.id;

      if (!roleAuth) {
        throw new Error("Missing user role");
      }
      if (!roleId) {
        throw new Error("Missing user id");
      }

      let result = null;
      if (roleAuth === ROLE_USER.AD) {
        result = await courceRepositories.getAll(true);
      }
      if (roleAuth === ROLE_USER.ST || roleAuth === ROLE_USER.TC) {
        result = await courseService.studentGetCourse(roleId);
      }

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
