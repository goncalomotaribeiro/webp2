<template>
  <div id="app">
    <Navbar
      v-if="
        !this.$store.getters.isLoggedUser ||
          this.$store.getters.getLoggedUser.user_type === 'STUDENT'"/>

    <NavbarAdmin v-if="this.$store.getters.getLoggedUser.user_type === 'ADMIN'" />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import NavbarAdmin from "@/components/NavbarAdmin.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    NavbarAdmin
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
