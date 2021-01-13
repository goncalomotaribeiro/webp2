<template>
  <div id="users">
    <h3>Gestão de entidades</h3>
    <br /><br />
    <b-container id="usersTable">
      <b-row class="justify-content-md-center">
        <b-col>
          <b-button id="btnAdd">+</b-button>
          <label for="">Adicionar</label>
        </b-col>
        <b-col>
          <b-row>
            <b-col><label for="">Tipo:</label></b-col>
            <b-col>
              <b-form-select v-model="selectedType" :options="type">
              </b-form-select>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col><label for="">Email:</label></b-col>
            <b-col>
              <b-form-input v-model="email" type="email" placeholder="email">
              </b-form-input>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <br /><br />
      <!-- TABELA COM UTILIZADORES -->
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Tipo de utilizador</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="user.id" v-for="user in users">
            <td></td>
            <td>{{ user.email }}</td>
            <td>{{ user.password }}</td>
            <td></td>

            <td>
              <b-button variant="success" class="mr-3">Editar</b-button>
              <b-button @click="deleteTask" variant="danger">Apagar</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "UsersTable",
  data() {
    return {
      users: [],
      type: [
        { value: null, text: "Todos" },
        { value: "student", text: "Estudante" },
        { value: "teacher", text: "Docente" },
        { value: "admin", text: "Administrador" },
      ],
      email: "",
      selectedType: null,
    };
  },
  created() {
    this.users = this.$store.getters.getUsers;
  },
  methods: {
    deleteTask() {
      if (confirm("Deseja mesmo remover o utilizador?")) {
        this.$store.dispatch("deleteUser", this.user.email);
        console.log("deleted user!!");
      }
    },
  },
  computed: {},
};
</script>

<style>
#users {
  margin-top: 130px;
}

#btnAdd {
  margin-right: 10px;
  font-size: 20px;
  color: black;
  border: 2px solid;
  background-color: white;
  border-radius: 8px;
}
</style>