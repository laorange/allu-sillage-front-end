import {Course} from "./api";
import dayjs from "dayjs";

function whetherTwoArraysHaveSameElement(as: unknown[], bs: unknown[]): boolean {
    return as.filter(a => bs.indexOf(a) > -1).length > 0;
}

export const filters = {
    course: {
        byGroupIds(groupIds: number[], selectNoneIsSelectAll: boolean = true) {
            if (selectNoneIsSelectAll && groupIds.length === 0) {
                return () => true;
            }
            return (course: Course) => {
                let courseGroupIds = JSON.parse(course.group_ids ?? "[]") as number[];
                return whetherTwoArraysHaveSameElement(courseGroupIds, groupIds);
            };
        },
        byRoomIds(roomIds: number[], selectNoneIsSelectAll: boolean = true) {
            if (selectNoneIsSelectAll && roomIds.length === 0) {
                return () => true;
            }
            return (course: Course) => {
                return roomIds.indexOf(course.room ?? -2) > -1;
            };
        },
        byMethods(methods: string[], selectNoneIsSelectAll: boolean = true) {
            if (selectNoneIsSelectAll && methods.length === 0) {
                return () => true;
            }
            return (course: Course) => {
                return methods.indexOf(course.method ?? "") > -1;
            };
        },
        byLessonName(lessonName: string, selectNoneIsSelectAll: boolean = true) {
            if (selectNoneIsSelectAll && lessonName.length === 0) {
                return () => true;
            }
            return (course: Course) => {
                return ((course.ch_name?.toLowerCase().indexOf(lessonName.toLowerCase()) ?? -2) > -1)
                    || ((course.en_name?.toLowerCase().indexOf(lessonName.toLowerCase()) ?? -2) > -1)
                    || ((course.fr_name?.toLowerCase().indexOf(lessonName.toLowerCase()) ?? -2) > -1);
            };
        },
        byTeacherName(teacherName: string, selectNoneIsSelectAll: boolean = true) {
            if (selectNoneIsSelectAll && !teacherName) {
                return () => true;
            }
            return (course: Course) => {
                return ((course.teacher_name?.indexOf(teacherName) ?? -2) > -1);
            };
        },
        byDate(date: dayjs.Dayjs) {
            return (course: Course) => {
                return dayjs(course.date).isSame(date, "day");
            };
        },
        byWhichLesson(whichLesson: number) {
            return (course: Course) => {
                return course.which_lesson === whichLesson;
            };
        },
    },
};