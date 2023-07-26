<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>ONLINE SQL QUERY RUNNER</h1>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">ExquteQuery</RouterLink>
        <RouterLink to="/predefined">PredefinedQueries</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
h1{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFA501;
    color: green;
    font-size: 30px;
    font-family: monospace;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4rem;
  font-size: 22px;
  font-family: monospace;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
