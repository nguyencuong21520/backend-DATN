import { Obj } from "../../interface";
import { Lesson } from "../../model/lesson";
import { Unit } from "../../model/unit";
import { ObjectId } from "bson";

import unitRepositories from "../../repositories/unit";
import lessonRepositories from "../../repositories/lesson";
import courceRepositories from "../../repositories/course";
import userRepositories, { OptionFind } from "../../repositories/user";

const courseService = {
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
  studentGetCourse: async (idUser: string) => {
    try {
      const fullCourse = await courceRepositories.getAll(true);
      const user = await userRepositories.findOneBySingleField(
        OptionFind.ID,
        idUser
      );

      const lessonDone = user.classEnrollment.map((lesson) => {
        return lesson.toString();
      });

      const result = fullCourse.map((course) => {
        if (lessonDone.includes(course._id.toString())) {
          return { ...course, enroll: true };
        } else {
          return { ...course, enroll: false };
        }
      });
      if(!result){
        throw new Error("cant map course")
      }


      return result;
    } catch {
      throw new Error("Fail to get course!");
    }
  },
  
};

export default courseService;
