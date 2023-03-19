<script setup>
import { onMounted, ref } from 'vue';
import EmployeeService from '../services/EmployeeService';
import EmployeeCard from './EmployeeCard.vue';

let employeeList = ref([]);

onMounted(async () => {
  try {
    const response = await EmployeeService.getAllEmployees();
    employeeList.value = response.data;
  }
  catch (error) {
    console.error(error);
  }
})

function OnEmployeeDeleted(id) {
  employeeList.value = employeeList.value.filter(item => item.id != id);
}
</script>

<template>
  <div>
    <h2>Employees List</h2>
    <EmployeeCard v-for="employee in employeeList" :key="employee.id" :employee="employee"
      @employee-deleted-event="OnEmployeeDeleted" />
  </div>
</template>