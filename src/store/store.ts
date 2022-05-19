import {defineStore} from "pinia";
import {formatDate} from "../assets/ts/timeFormater";
import {CourseApi} from "../assets/ts/api";
import {ApiData} from "../assets/ts/types";
import dayjs from "dayjs";

type State = {
    courseApi: CourseApi
    apiData: ApiData
}

export const useStore = defineStore("store", {
    state(): State {
        return {
            courseApi: new CourseApi(),
            apiData: {
                semesterConfig: null,
                courses: null,
                groups: null,
                notices: null,
                courseChangeLogs: null,
                classrooms: null,
            },
        };
    },
    getters: {},
    actions: {
        async updateInfoFromBackend() {
            // 无需排队请求
            // this.apiData.groups = (await this.courseApi.courseApiGroupGet()).data;
            // this.apiData.notices = (await this.courseApi.courseApiNoticeGet()).data;
            // this.apiData.courseChangeLogs = (await this.courseApi.courseApiCourseChangeLogGet()).data;
            // this.apiData.classrooms = (await this.courseApi.courseApiClassroomGet()).data;

            let dateThreeDaysAgo = formatDate(dayjs().add(-3, "day"));

            this.courseApi.courseApiGroupGet().then(
                response => {
                    this.apiData.groups = response.data;
                },
            );
            this.courseApi.courseApiNoticeGet().then(
                response => {
                    this.apiData.notices = response.data;
                },
            );
            this.courseApi.courseApiCourseChangeLogGet(dateThreeDaysAgo).then(
                response => {
                    this.apiData.courseChangeLogs = response.data;
                },
            );
            this.courseApi.courseApiClassroomGet().then(
                response => {
                    this.apiData.classrooms = response.data;
                },
            );
            this.apiData.semesterConfig = (await this.courseApi.courseApiSemesterConfigGet()).data;
            this.apiData.courses = (await this.courseApi.courseApiCourseGet(`${this.apiData.semesterConfig.current_period}`)).data;
        },
    },
});