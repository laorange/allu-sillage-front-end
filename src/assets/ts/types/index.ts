import {Classroom, Course, CourseChangeLog, Group, Notice, SemesterConfig} from "../api";

interface StrKeyObj {
    [key: string]: string | StrKeyObj;
}

export interface Language extends StrKeyObj {

}

export interface ApiData {
    semesterConfig: SemesterConfig;
    courses: Course[];
    groups: Group[];
    notices: Notice[];
    courseChangeLogs: CourseChangeLog[];
    classrooms: Classroom[];
}
