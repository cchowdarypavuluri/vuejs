import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Resource from '@/components/programmersResource/Resource';
import CreateResource from '@/components/programmersResource/CreateResource';
import EditResource from '@/components/programmersResource/EditResource';

import User from '@/components/users/users';
import CreateUser from '@/components/users/CreateUsers';
import EditUser from '@/components/users/EditUsers';

import Department from '@/components/departments/Department';
import CreateDepartment from '@/components/departments/CreateDepartments';
import EditDepartment from '@/components/departments/EditDepartments';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/resources/add',
      name: 'CreateResource',
      component: CreateResource,
    },
    {
      path: '/resources/:id',
      props: true,
      name: 'Resource',
      component: Resource,
    },
    {
      path: '/resources/:id/edit',
      props: true,
      name: 'EditResource',
      component: EditResource,
    },
    {
      path: '/users/:id',
      props: true,
      name: 'User',
      component: User,
    },
    {
      path: '/users/add',
      name: 'CreateUser',
      component: CreateUser,
    },
    {
      path: '/users/:id/edit',
      props: true,
      name: 'EditUser',
      component: EditUser,
    },
    {
      path: '/departments/:id',
      props: true,
      name: 'Department',
      component: Department,
    },
    {
      path: '/departments/add',
      name: 'CreateDepartment',
      component: CreateDepartment,
    },
    {
      path: '/departments/:id/edit',
      props: true,
      name: 'EditDepartment',
      component: EditDepartment,
    },
  ],
  mode: 'history',
});
