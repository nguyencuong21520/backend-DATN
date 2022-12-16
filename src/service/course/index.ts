import { Obj } from "../../interface";
import { Lesson } from "../../model/lesson";
import { Unit } from "../../model/unit";
import { ObjectId } from "bson";

import unitRepositories from "../../repositories/unit";
import lessonRepositories from "../../repositories/lesson";
import courceRepositories from "../../repositories/course";
import userRepositories, { OptionFind } from "../../repositories/user";

const mapDoneCourse = (course, user) => {
  const lessonDone = user.lessonDone.map((lesson) => {
    return lesson.toString();
  });
  return course.map((course) => {
    return {
      ...course,
      unit: course.unit.map((unit) => {
        return {
          ...unit,
          lesson: unit.lesson.map((lesson) => {
            if (lessonDone.includes(lesson._id.toString())) {
              return { ...lesson, done: true };
            } else {
              return { ...lesson, done: false };
            }
          }),
        };
      }),
    };
  });
};

const courseService = {
  createCourse: async (idUser: string,info: any) => {
    try {
      const createCourse = await courceRepositories.create(info);
      if (!createCourse) {
        throw new Error("Fail to create course!");
      }
      const currentIdCourse = createCourse.insertedId;

      const addClassEnrollment = await userRepositories.addClassEnrollment(
        idUser,
        new ObjectId(currentIdCourse)
      );
      if (!addClassEnrollment) {
        throw new Error("Update class enrollment failed!");
      }
      return createCourse;
    } catch {
      throw new Error("Fail to create course!");
    }
  },

  createUnit: async (idCourse: string, idAuthor: string, info: Obj) => {
    try {
      const { unitName } = info;

      const unit = Unit.create(unitName, idAuthor);
      const createUnit = await unitRepositories.create(unit);
      if (!createUnit) {
        throw new Error("Fail to create unit!");
      }
      const currentIdUnit = createUnit.insertedId;

      const updateUnitToCourse = await courceRepositories.addUnitToCourse(
        idCourse,
        new ObjectId(currentIdUnit)
      );
      if (!updateUnitToCourse) {
        throw new Error("Update unit to course failed!");
      }
      return createUnit;
    } catch {
      throw new Error("Fail to create unit!");
    }
  },
  createLesson: async (idUnit: string, idAuthor: string, info: Obj) => {
    try {
      const { lessonName, source, type } = info;

      const lesson = Lesson.create(lessonName, source, type, idAuthor);
      const createLesson = await lessonRepositories.create(lesson);
      if (!createLesson) {
        throw new Error("Fail to create lesson!");
      }
      const currentIdLesson = createLesson.insertedId;
      const updateLessonToUnit = await unitRepositories.addLessonToUnit(
        idUnit,
        new ObjectId(currentIdLesson)
      );
      if (!updateLessonToUnit) {
        throw new Error("Update lesson to unit failed!");
      }
      return createLesson;
    } catch {
      throw new Error("Fail to create unit!");
    }
  },
  GetCourse: async (idUser: string) => {
    try {
      const fullCourse = await courceRepositories.getAll(true, "");
      const user = await userRepositories.findOneBySingleField(
        OptionFind.ID,
        idUser
      );

      if (!fullCourse) {
        throw new Error("Cant get course");
      }
      if (!user) {
        throw new Error("Cant get user");
      }

      const classEnrollment = user.classEnrollment.map((lesson) => {
        return lesson.toString();
      });

      const result = fullCourse.map((course) => {
        if (classEnrollment.includes(course._id.toString())) {
          return { ...course, enroll: true };
        } else {
          return { ...course, enroll: false, unit: [] };
        }
      });
      if (!result) {
        throw new Error("cant map course");
      }
      return result;
    } catch {
      throw new Error("Fail to get course!");
    }
  },
  GetCourseById: async (idUser: string, idCoure: string, access: boolean) => {
    try {
      const fullCourse = await courceRepositories.getAll(true, idCoure);
      const user = await userRepositories.findOneBySingleField(
        OptionFind.ID,
        idUser
      );
      if (!fullCourse) {
        throw new Error("Cant get course");
      }
      if (!user) {
        throw new Error("Cant get user");
      }
      const classEnrollment = user.classEnrollment.map((lesson) => {
        return lesson.toString();
      });

      if (classEnrollment.includes(fullCourse[0]._id.toString()) || access) {
        const courseMapDone = mapDoneCourse(fullCourse, user);
        return [{ ...courseMapDone[0], enroll: true }];
      } else {
        return [{ ...fullCourse[0], enroll: false, unit: [] }];
      }
    } catch {
      throw new Error("Fail to get course!");
    }
  },
};

export default courseService;
