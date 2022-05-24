import {Classroom, Course, CourseChangeLog, Group, Notice, SemesterConfig} from "../api";

interface StrKeyObj {
    [key: string]: string | StrKeyObj;
}

export interface Language extends StrKeyObj {

}

export type LanguageOptions = "zh" | "en" | "fr"

export interface UserBookmark {
    path: string;
    alias: string;
}

export interface ApiData {
    semesterConfig: SemesterConfig;
    courses: Course[];
    groups: Group[];
    notices: Notice[];
    courseChangeLogs: CourseChangeLog[];
    classrooms: Classroom[];
}

export interface ElementCascaderOption {
    value: number,
    label: string,
    children?: ElementCascaderOption[]
}