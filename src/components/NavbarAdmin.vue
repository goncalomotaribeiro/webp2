<template>
  <div id="navAdmin" class="fixed-top">
        <b-button class="btnMenu" v-b-toggle.sidebar-variant><b-img src="../assets/logo_.png" fluid alt="Fluid image"></b-img></b-button>
        <b-sidebar id="sidebar-variant" title="Admin" bg-variant="dark" text-variant="light" shadow>
        <div class="px-3 py-2">
           <b-list-group class="links">
                <b-list-group-item to="/admin">Painel</b-list-group-item>
                <b-list-group-item to="/admin/users-admin">Utilizadores</b-list-group-item>
                <b-list-group-item to="/admin/challenges-admin">Desafios</b-list-group-item>
                <b-list-group-item to="/admin/submissions-admin">Submissões</b-list-group-item>
                <b-list-group-item to="/admin/events-admin">Eventos</b-list-group-item>
                <b-list-group-item @click.native='logout' to="/">Sair</b-list-group-item>
            </b-list-group>
        </div>
        </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "NavbarAdmin",
  methods: {
    logout() {
        this.$store.dispatch('logout')
    },
    subIsActive(input) {
    const paths = Array.isArray(input) ? input : [input]
    return paths.some(path => {
      return this.$route.path.indexOf(path) === 0 // current path starts with this path string
    })
    }
  }
};
</script>

<style>
#navAdmin .links a{
    background-color: transparent;
    border: 0;
    color: white;
    font-family: 'Segoe UI';
    font-weight: 600;
}

#navAdmin .links a:hover{
    background-color: #fff6c5;
    color: black;
}

#navAdmin .links .router-link-exact-active {
    background-color: #FFF9C5;
    color: black;
}

#navAdmin .btnMenu{
    background-color: transparent;
    border: 0;
}

</style>
