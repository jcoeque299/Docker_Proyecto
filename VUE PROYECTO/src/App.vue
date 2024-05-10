<script setup>
  import { RouterView } from 'vue-router';
  import NavBar from "./components/NavBar.vue"
  import FooterComponent from "./components/FooterComponent.vue"
</script>

<template>
  <header>
    <nav>
      <NavBar/>
    </nav>
  </header>
  <main>
    <RouterView/>
  </main>
  <footer>
    <FooterComponent/>
  </footer>
</template>