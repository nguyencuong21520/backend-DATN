import { Obj } from "../../interface";
import { Unit } from "../../model/unit";
import { ObjectId } from "bson";

import unitRepositories from "../../repositories/unit";
import courceRepositories from "../../repositories/course";

const courseService = {
  createUnit: async (idCourse: string, info: Obj) => {
    try {
      const { unitName } = info;

      const unit = Unit.create(unitName);
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
};

export default courseService;
