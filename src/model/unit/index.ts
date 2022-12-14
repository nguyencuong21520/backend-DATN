import { ObjectId } from "bson";
import { Obj } from "../../interface";

class Unit {
  public _id: ObjectId = null;
  public unitName: string = null;
  public lesson: Obj[] = null;
  public createTime: Date = null;

  constructor(
    unitName: string | null,
    lesson: Obj[] = null,
    createTime: Date | null
  ) {
    this._id = new ObjectId();
    this.unitName = unitName;
    this.lesson = lesson;
    this.createTime = createTime;
  }
  static mapDataFromDocument(document: Obj) {
    const unit = new Unit(
      document.unitName,
      document.lesson,
      document.createTime
    );
    unit._id = document._id;

    return unit;
  }
  static create(unitName: string | null) {
    const createTime = new Date();

    const unit = new Unit(unitName, [], createTime);
    return unit;
  }
}
export { Unit };
