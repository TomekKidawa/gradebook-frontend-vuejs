import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('../views/BoardAdmin.vue') ,
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('../views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('../views/BoardUser.vue')
    },
    {
      path: '/edituser',
      name: 'edituser',
      component:() => import('../views/EditUserView.vue')
    },
    {
      path: '/addgrade',
      name: 'addgrade',
      component:() => import('../views/AddGradeStudent.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/showgrade',
      name: 'showgrade',
      component:() => import('../views/ShowGradeStudent.vue'),
      meta: {
        requiresAuth: true
      }
    }

  ]
});