import {Classroom, Course, CourseChangeLog, Group, Notice, SemesterConfig} from "../api";

interface StrKeyObj {
    [key: string]: string | StrKeyObj;
}

export interface Language extends StrKeyObj {

}

export interface ApiData {
    semesterConfig: SemesterConfig | null;
    courses: Course[] | null;
    groups: Group[] | null;
    notices: Notice[] | null;
    courseChangeLogs: CourseChangeLog[] | null;
    classrooms: Classroom[] | null;
}
