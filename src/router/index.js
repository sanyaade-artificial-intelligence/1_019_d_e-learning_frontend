import Vue from 'vue';
import VueRouter from 'vue-router';

import { ACCESS_TOKEN } from '../config/localStorageVariables';

Vue.use(VueRouter);

const authRequired = (role) => {
  return {
    authRequired: true,
    role: role || 'all',
  };
};

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../ui/views/Home.vue'),
    meta: {
      ...authRequired(),
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../ui/views/Login.vue'),
  },
  {
    path: '/password-forgotten',
    name: 'PasswordForgotten',
    component: () => import(/* webpackChunkName: "PasswordForgotten" */ '../ui/views/PasswordForgotten.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../ui/views/Register.vue'),
  },
  // Teacher ---------------------------------------------------------------------------------------
  {
    path: '/dashboard_teacher',
    name: 'Dashboard Teacher',
    component: () => import(/* webpackChunkName: "DashboardTeacher" */ '../ui/views/Dashboard.vue'),
    meta: { ...authRequired('teacher') },
    children: [
      {
        path: 'teachers_room',
        component: () => import(/* webpackChunkName: "DashboardTeacher" */ '../ui/views/teacher/TeachersRoom.vue'),
        meta: { ...authRequired('teacher') },
        children: [
          {
            path: 'timetable',
            component: () => import(/* webpackChunkName: "DashboardTeacher" */ '../ui/views/teacher/timetable/Timetable.vue'),
            meta: { ...authRequired('teacher') },
          },
          {
            path: 'teach_room',
            component: () => import(/* webpackChunkName: "DashboardTeacher" */ '../ui/views/teacher/teach-room/TeachRoom.vue'),
            meta: { ...authRequired('teacher') },
          },
          {
            path: 'courses/:id',
            component: () => import(/* webpackChunkName: "DashboardTeacher" */ '../ui/views/teacher/courses/Courses.vue'),
            meta: { ...authRequired('teacher') },
            children: [
              {
                path: 'files',
                component: () => import(/* webpackChunkName: "DashboardTeacher" */ '../ui/views/teacher/courses/files/Files.vue'),
                meta: { ...authRequired('teacher') },
              },
              {
                path: 'stream',
                component: () => import(/* webpackChunkName: "DashboardTeacher" */ '../ui/views/teacher/courses/stream/Stream.vue'),
                meta: { ...authRequired('teacher') },
              },
            ],
          },
        ],
      },
      {
        path: 'students_room',
        component: () => import(/* webpackChunkName: "DashboardTeacher" */ '../ui/views/teacher/StudentsRoom.vue'),
        meta: { ...authRequired('teacher') },
      },
    ],
  },
  // Student ---------------------------------------------------------------------------------------
  {
    path: '/dashboard_student',
    name: 'Dashboard Student',
    component: () => import(/* webpackChunkName: "DashboardStudent" */ '../ui/views/Dashboard.vue'),
    meta: { ...authRequired('student') },
    children: [
      {
        path: 'classroom',
        component: () => import(/* webpackChunkName: "DashboardStudent" */ '../ui/views/students/Classroom.vue'),
        meta: { ...authRequired('student') },
        children: [
          {
            path: 'timetable',
            component: () => import(/* webpackChunkName: "DashboardStudent" */ '../ui/views/students/timetable/Timetable.vue'),
            meta: { ...authRequired('student') },
          },
          {
            path: 'classroom',
            component: () => import(/* webpackChunkName: "DashboardStudent" */ '../ui/views/students/classroom/Classroom.vue'),
            meta: { ...authRequired('student') },
          },
          {
            path: 'stream',
            component: () => import(/* webpackChunkName: "DashboardStudent" */ '../ui/views/students/stream/Stream.vue'),
            meta: { ...authRequired('student') },
          },
        ],
      },
      {
        path: 'tasks',
        component: () => import(/* webpackChunkName: "DashboardStudent" */ '../ui/views/students/Tasks.vue'),
        meta: { ...authRequired('student') },
      },
    ],
  },
  {
    path: '/404-not-found',
    name: '404 Not Found',
    component: () => import(/* webpackChunkName: "NotFound" */ '../ui/views/NotFound.vue'),
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '*',
    redirect: '/404-not-found',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
