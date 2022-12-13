import { ObjectId } from "bson";
import { COURCE_LEVEL, COURSE_TYPE, STATUS_COURSE } from "../../Enum";
import { Obj } from "../../interface";




class Course {
  public _id: ObjectId = null;
  public unitName: string = null;
  public lesson: Obj[] = null;

  constructor(
    un
    nameCourse: string | null,
    major: string | null,
    author: ObjectId | null,
    img: string | null,
    summaryCourse: string | null,
    videoThumbnail: string | null,
    courses: Unit[] | null,
    level: COURCE_LEVEL | null,
    comment: Obj[] | null,
    studentEnroll: StudentEnroll[] | null,
    createTime: Date | null,
    status: STATUS_COURSE | null
  ) {
    this._id = new ObjectId();
    this.author = author;
    this.courses = courses;
    this.img = img;
    this.major = major;
    this.nameCourse = nameCourse;
    this.summaryCourse = summaryCourse;
    this.videoThumbnail = videoThumbnail;
    this.level = level;
    this.comment = comment;
    this.studentEnroll = studentEnroll;
    this.createTime = createTime;
    this.status = status;
  }
  static mapDataFromDocument(document: Obj) {
    const course = new Course(
      document.nameCourse,
      document.major,
      document.author,
      document.img,
      document.summaryCourse,
      document.videoThumbnail,
      document.courses,
      document.level,
      document.comment,
      document.studentEnroll,
      document.createTime,
      document.status
    );
    course._id = document._id;

    return course;
  }
  static createCourse(
    nameCourse: string | null,
    major: string | null,
    author: ObjectId | null,
    img: string | null,
    summaryCourse: string | null,
    videoThumbnail: string | null,
    courses: Unit[] | null,
    level: COURCE_LEVEL | null,
    comment: Obj[] | null,
    studentEnroll: StudentEnroll[] | null,
    createTime: Date | null,
    status: STATUS_COURSE | null
  ) {
    const course = new Course(
      nameCourse,
      major,
      author,
      img,
      summaryCourse,
      videoThumbnail,
      courses,
      level,
      comment,
      studentEnroll,
      createTime,
      status
    );
    return course;
  }
}
export default Course;
