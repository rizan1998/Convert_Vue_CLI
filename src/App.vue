<template>
  <div id="app">
    <Navigation />
    <div class="px-5 mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
export default {
  components: {
    Navigation,
  },
};
</script>

