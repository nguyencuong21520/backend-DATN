import { ObjectId } from "bson";
import { Obj } from "../../interface";
import { COURSE_TYPE } from "../../Enum";

class Lesson {
  public _id: ObjectId = null;
  public lessonName: string = null;
  public source: string = null;
  public type: COURSE_TYPE = null;
  public createTime: Date = null;

  constructor(
    lessonName: string | null,
    source: string = null,
    type: COURSE_TYPE = null,
    createTime: Date | null
  ) {
    this._id = new ObjectId();
    this.lessonName = lessonName;
    this.source = source;
    this.type = type;
    this.createTime = createTime;
  }
  static mapDataFromDocument(document: Obj) {
    const lesson = new Lesson(
      document.lessonName,
      document.source,
      document.type,
      document.createTime
    );
    lesson._id = document._id;
    return lesson;
  }
  static create(
    lessonName: string | null,
    source: string | null,
    type: COURSE_TYPE | null
  ) {
    const createTime = new Date();
    const lesson = new Lesson(lessonName, source, type, createTime);
    return lesson;
  }
}
export { Lesson };
