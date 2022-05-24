import {defineStore} from "pinia";
import {formatDate, getIsoWeekDay, getWeekAmountBetweenTwoDay} from "../assets/ts/datetimeUtils";
import {CourseApi} from "../assets/ts/api";
import {ApiData, UserBookmark} from "../assets/ts/types";
import dayjs from "dayjs";
import constants from "../assets/constants.json";

type State = {
    isLoading: boolean
    courseApi: CourseApi
    apiData: ApiData
    filterOptions: {
        date: dayjs.Dayjs
        classrooms: number[]
        groups: number[]
        teacherName: string
        method: string
        whatDay: number
    },
    bookmarks: UserBookmark[]
}

export const useStore = defineStore("store", {
    state(): State {
        return {
            isLoading: false,
            courseApi: new CourseApi(),
            apiData: {
                semesterConfig: {
                    "current_period": 30,
                    "current_period_display": "2022.02~2022.07",
                    "week1_monday_date": "2022-02-28T00:00:00",
                    "max_week": 20,
                },
                courses: [],
                groups: [],
                notices: [],
                courseChangeLogs: [],
                classrooms: [],
            },
            filterOptions: {
                date: dayjs(),
                classrooms: [],
                groups: [],
                teacherName: "",
                method: "",
                whatDay: getIsoWeekDay(dayjs()),
            },
            bookmarks: [],
        };
    },
    getters: {
        /**
         * @summary 当前学期戳
         */
        current_period(): number {
            return this.apiData.semesterConfig.current_period;
        },

        /**
         * @summary 第一周周一的日期
         */
        week1_monday_date(): dayjs.Dayjs {
            return dayjs(this.apiData.semesterConfig.week1_monday_date);
        },

        /**
         * @summary 本学期的最大周数
         */
        max_week(): number {
            return this.apiData.semesterConfig.max_week;
        },

        /**
         * @summary 学期戳的解释性文字
         */
        current_period_display(): string {
            return this.apiData.semesterConfig.current_period_display ?? "";
        },
    },
    actions: {
        /**
         * 获取某周的周一日期
         * @param week 第?周
         * */
        getMondayDateOfSomeWeek(week: number): dayjs.Dayjs {
            return this.week1_monday_date.add(week - 1, "week");
        },

        /**
         * 获取某一天是这学期的第几周
         * @param date 某一天
         */
        getWeekNumOfSomeDay(date: dayjs.Dayjs = dayjs()): number {
            return getWeekAmountBetweenTwoDay(dayjs(this.apiData.semesterConfig.week1_monday_date), date) + 1;
        },

        /**
         * grade ∈ [1,7] 转换为 semester ∈ [1,14]
         * @param grade 第几年级
         */
        getSemesterOfGrade(grade: number) {
            return grade * 2 - this.apiData.semesterConfig.current_period % 2;
        },

        /**
         * 从后台获取数据，并存入 this.apiData
         */
        async updateInfoFromBackend() {
            this.isLoading = true;
            let timer = setTimeout(() => (this.isLoading = false), constants.NETWORK_REQUEST_TIME_LIMIT);

            let dateThreeDaysAgo = formatDate(dayjs().add(-3, "day"));

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

            // 需要等待 semesterConfig 完成请求
            this.apiData.semesterConfig = (await this.courseApi.courseApiSemesterConfigGet()).data;

            this.courseApi.courseApiGroupGet(`${this.apiData.semesterConfig.current_period}`).then(
                response => (this.apiData.groups = response.data),
            );

            this.courseApi.courseApiCourseGet(`${this.apiData.semesterConfig.current_period}`).then(
                response => (this.apiData.courses = response.data),
            ).finally(() => {
                this.isLoading = false;
                clearTimeout(timer);
            });
        },
    },
});