<script setup>
import HomeView from './views/HomeView.vue'
</script>

<template>
  <h1>Employee App</h1>
  <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/getall">Employee List</RouterLink> |
          <RouterLink to="/create">Create Employee</RouterLink>
        </nav>
      </div>
    </header>
  <HomeView />
</template>

<style>
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
h1 {
  font-size: 20px;
}
</style>
