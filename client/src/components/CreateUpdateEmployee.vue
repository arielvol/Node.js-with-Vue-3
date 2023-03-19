<template>
  <div>
    <h2 v-if="!id">Create a Employee</h2>
    <h2 v-else>Update Existing Employee</h2>
    <form @submit.prevent="createUpdateEmployee">
      <label for="first_name">First Name:</label>
      <input id="first_name" v-model="employeeObj.first_name" required />
      <label for="last_name">Last Name:</label>
      <input id="last_name" v-model="employeeObj.last_name" required />
      <label for="id_number">ID Number:</label>
      <input id="id_number" v-model="employeeObj.id_number" required />
      <label for="address">Address:</label>
      <input id="address" v-model="employeeObj.address" required />
      <label for="email">Email:</label>
      <input id="email" v-model="employeeObj.email" required />
      <label for="cell_phone">Cell Phone:</label>
      <input id="cell_phone" v-model="employeeObj.cell_phone" required />
      <label for="home_phone">Home Phone:</label>
      <input id="home_phone" v-model="employeeObj.home_phone" required />
      <button v-if="!id" type="submit">Create</button>
      <button v-else>Update</button>

    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import EmployeeService from '../services/EmployeeService';
import { useRouter } from 'vue-router';

export default {
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    let employeeObj = ref({})
    const router = useRouter();
    onMounted(async () => {
      try {
        if (props.id) {
          const response = await EmployeeService.getEmployeeById(props.id)
          employeeObj.value = response.data
        }
      }
      catch (error) {
        console.error(error);
      }
    })

    const createUpdateEmployee = async () => {
      try {
        let response;
        if (props.id) {
          response = await EmployeeService.updateEmployee(employeeObj.value);
          employeeObj.value = response.data;
        } else {
          response = await EmployeeService.createEmployee(employeeObj.value);
        }
        console.log(response.data)
        router.push('/getall');
      } catch (error) {
        console.log(error)
      }
    }

    return {
      employeeObj,
      createUpdateEmployee
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

label {
  font-size: 1.2rem;
  font-weight: bold;
}

input,
textarea {
  font-size: 1rem;
  padding: 0.5rem;
}

button {
  background-color: #4caf50;
  color: #fff;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:hover {
  background-color: #3e8e41;
}
</style>
