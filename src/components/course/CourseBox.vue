<script setup lang="ts">
import {Course} from "../../assets/ts/api";
import CourseCard from "./CourseCard.vue";
import {useI18n} from "vue-i18n";

withDefaults(defineProps<{ courses: Course[], columnThreshold?: number }>(), {columnThreshold: 3});

const {t} = useI18n({
  messages: {
    zh: {
      "noCourse": "没有课程安排",
    },
    en: {
      "noCourse": "No course here",
    },
    fr: {
      "noCourse": "Pas de Cours ici",
    },
  },
});

</script>

<template>
  <div class="course-box">
    <div class="box-no-more-than-three" v-if="courses.length===0">
      <div class="card-no-more-than-three" :style="{backgroundColor: '#efefef'}">
        <n-space :vertical="true">
          <div>{{ t("noCourse") }}</div>
          <van-icon name="smile-comment-o" size="30px"/>
        </n-space>
      </div>
    </div>

    <div class="box-no-more-than-three" v-if="courses.length>0 && courses.length<=columnThreshold">
      <div class="card-no-more-than-three"
           v-for="course in courses" :key="course.course_id">
        <course-card :course="course"/>
      </div>
    </div>

    <el-scrollbar>
      <div class="box-more-than-three" v-if="courses.length>columnThreshold">
        <div class="card-more-than-three"
             :style="{flex: `0 0 ${Math.round(100/courses.length)}`}"
             v-for="course in courses" :key="course.course_id">
          <course-card :course="course"/>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>
.box-no-more-than-three, .box-more-than-three {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.card-no-more-than-three + .card-no-more-than-three, .card-more-than-three + .card-more-than-three {
  padding-left: 3px;
}

.card-no-more-than-three, .card-more-than-three {
  width: 100%;
}

.card-no-more-than-three {

}

.card-more-than-three {
  flex: 0 0 45%;
}
</style>