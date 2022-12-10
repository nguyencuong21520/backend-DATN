import { ObjectId } from "bson";
import { COURCE_LEVEL, COURSE_TYPE } from "../../Enum";
import { Obj } from "../../interface";

export interface Courses {
  no: number; // thứ tự khóa học
  title: string; // tiêu đề khóa học
  listLesson: {
    id_course: ObjectId;
    noLesson: number; // thứ tự bài học
    titleLesson: string; // tiêu đề bài học
    source: string; // video bài học
    type: COURSE_TYPE; // kiểu định dạng
  }[];
}
class Cource {
  public _id: ObjectId = null;
  public nameCource: string = null; // tên khóa học
  public major: string = null; // bộ môn của khóa
  public author: ObjectId = null; // tác giả
  public img: string = null; // hình ảnh
  public level: COURCE_LEVEL = null; // cấp độ của khóa học
  public summaryCource: string = null; // tóm tắt nội dung khóa học
  public videoThumbnail: string = null; // video giới thiệu thumbnail
  public comment: Obj[] | Record<string, unknown>[] = null; //  danh sách bình luận
  public courses: Courses[] = null; // Các phần bài giảng của khóa học
  constructor(
    nameCource: string | null,
    major: string | null,
    author: ObjectId | null,
    img: string | null,
    summaryCource: string | null,
    videoThumbnail: string | null,
    courses: Courses[] | null,
    level: COURCE_LEVEL | null
  ) {
    this._id = new ObjectId();
    this.author = author;
    this.courses = courses;
    this.img = img;
    this.major = major;
    this.nameCource = nameCource;
    this.summaryCource = summaryCource;
    this.videoThumbnail = videoThumbnail;
    this.level = level;
    this.comment = [];
    this.courses = [];
  }
  static mapDataFromDocument(document: Obj) {
    const cource = new Cource(
      document.nameCource,
      document.major,
      document.author,
      document.img,
      document.summaryCource,
      document.videoThumbnail,
      document.courses,
      document.level
    );
    cource._id = document._id;
    cource.comment = document.comment;
    cource.courses = document.courses;

    return cource;
  }
  static createCource(
    nameCource: string | null,
    major: string | null,
    author: ObjectId | null,
    img: string | null,
    summaryCource: string | null,
    videoThumbnail: string | null,
    courses: Courses[] | null,
    level: COURCE_LEVEL | null
  ) {
    const user = new Cource(
      nameCource,
      major,
      author,
      img,
      summaryCource,
      videoThumbnail,
      courses,
      level
    );
    return user;
  }
}
export default Cource;
