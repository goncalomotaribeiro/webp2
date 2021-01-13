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
              <b-form-select v-model="filterTypeSelected" :options="type">
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
      <b-table striped hover :users="users">
        <template v-slot:cell(actions)="data">
          <b-button id="btnEdit" variant="success" class="mr-2" @click="edit(data.id)">Editar</b-button>
          <b-button id="btnRemove" variant="danger" @click="remove(data.id)">Remover</b-button>
        </template>
      </b-table>
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
        { text: "Estudante" },
        { text: "Docente" },
        { text: "Administrador" },
      ],
      email: "",
      filterTypeSelected: "All",
    };
  },
  created(){
      this.users = this.$store.getters.getUsers
      
  },
  methods: {},
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