# Sillage

## 公共组件

+ 底部标签栏|TabBar.vue
+ FilterConfigDialog.vue
+ CourseCard.vue

## Pages

### /

- 首页|Index.vue

  -  公告|Notice.vue
  -  标题|TitleHeader.vue
  -  语言切换|LanguageSwitch.vue
  -  按年级看课表的快捷入口栏|GradeList.vue

     - 大一~研三（7个年级）

       - router.push=>/course/?semester=...

     - 自定义

       - FilterConfigDialog.vue

  -  功能入口|FunctionEntrance.vue

     - 考试列表

       - router.push=>/exam/

     - 空闲教室

       - router.push=>/classroom/

  -  浏览历史|BrowseHistory.vue

### /about/

- 关于|About.vue

  - Logo&版本号|AboutSillage.vue
  - 开发者|Contributors.vue
  - 关于项目的选项|AboutOptions.vue

    - 说明文档

      - window.open("http://docs.siae.top/")

    - 意见反馈

      - FeedbackDialog.vue

    - 赞赏支持

      - DonateDialog.vue

### /classroom/

- 教室列表|ClassroomList.vue

  - 参考：http://new.siae.top/#/classroom

### /exam/

- 考试列表|exam.vue

  - 参考：http://new.siae.top/#/exam

### /course/

- 课表查询

  - 路由守卫

    - /course/pc/

      - QueryPc.vue

        - FilterConfigDialog.vue
        - PcCourseTableTitle.vue
        - PcCourseTable.vue

          - 7×5×PcCourseBox.vue

            - CourseCard.vue

    - /course/mobile/

      - QueryMobile.vue

        - FilterConfigDialog.vue
        - DateSelector.vue

          - 日期选择器 + 第?周星期?

        - MobileCourseTable.vue

          - WhichLessonSideBar.vue
          - CourseCard.vue

