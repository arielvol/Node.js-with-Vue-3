<script setup>
import EmployeeService from '../services/EmployeeService';
import { defineEmits } from 'vue';

defineProps({
  employee: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(['employee-deleted-event']);

async function deleteEmployee(id) {
  await EmployeeService.deleteEmployee(id);
  emits('employee-deleted-event', id);
}
</script>

<template>
  <RouterLink :to="{
    name: 'update-employee',
    params: { id: employee.id },
  }">
    <div class="event-card">
      <p id="first_name">{{ employee.first_name }}</p>
      <p id="last_name">{{ employee.last_name }}</p>
      <p id="address">{{ employee.address }}</p>
      <p id="id_number">{{ employee.id_number }}</p>
      <p id="email">{{ employee.email }}</p>
      <p id="cell_phone">{{ employee.cell_phone }}</p>
      <p id="home_phone">{{ employee.home_phone }}</p>
      <button @click.prevent="deleteEmployee(employee.id)">Delete</button>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.event-card {
  cursor: pointer;
  border: 3px solid #39495c;
  padding: 20px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.router-link-active,
.router-link-exact-active {
  ul {
    list-style: none;
    padding: 0;
    margin-top: 2rem;
  }

  li {
    background-color: #f1f1f1;
    padding: 1rem;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.2rem;
    margin-top: 0;
  }
}

button {
  background-color: red;
  color: #fff;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:hover {
  background-color: #8e473e;
}
</style>
