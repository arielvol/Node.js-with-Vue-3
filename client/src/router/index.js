import { createRouter, createWebHistory } from 'vue-router'
import EmployeeList from '../components/EmployeeList.vue';
import CreateUpdateEmployee from '../components/CreateUpdateEmployee.vue';
import HomeView from '../views/HomeView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/getall',
      name: 'employee-list',
      component: EmployeeList
    },
    {
      path: '/create',
      name: 'create-employee',
      component: CreateUpdateEmployee
    },
    {
      path: '/update:id',
      name: 'update-employee',
      component: CreateUpdateEmployee,
      props: true,
    },
  ]
})

export default router;
