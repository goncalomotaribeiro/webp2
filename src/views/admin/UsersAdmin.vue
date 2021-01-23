<template>
  <div id="users-admin">
    <h3>Gestão de Utilizadores</h3>
    <br /><br />

    <!-- FILTROS UTILIZADORES -->
    <b-container id="usersTable">
      <b-row class="text-left d-flex align-items-center">
        <b-col cols="3">
          <b-button id="btnAdd" class="mr-3" v-b-modal.modal-1>+</b-button>
          <label for="">Adicionar</label>
        </b-col>
        <b-col>
          <b-row>
            <b-col cols="0"><label for="">Tipo:</label></b-col>
            <b-col>
              <b-form-select id="filterUserType" class="btnMenu2 ml-4" 
                  v-model="filterUserTypeSelected"
                  :options="getAllUserTypes"
                  size="sm">
                    <template #first>
                    <b-form-select-option value="all">Todos</b-form-select-option>
                    </template>
              </b-form-select>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col cols="3" class="ml-4"><label for="">Procurar:</label></b-col>
            <b-col>
              <b-form-input type="text" placeholder="Username" v-model="search">
              </b-form-input>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <br /><br />

      <!-- TABELA UTILIZADORES -->
      <table class="table table-striped table-bordered" sticky-header>
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Tipo</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody columns v-if="getAllUsers.length  > 0">
          <tr v-for="user in getAllUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.password }}</td>
            <td>{{ user.type }}</td>
            <td>
              <b-button @click="editOpen" :id="user.id" variant="info" class="mr-3" v-b-modal.modal-2>Editar</b-button>
              <b-button @click="deleteUser" :id="user.id" variant="danger">Apagar</b-button>
            </td>
          </tr>
        </tbody>
        <p v-else class="info">Não existem Utilizadores criados</p>
      </table>

      <!-- FORMULÁRIO CRIAR UTILIZADOR -->
      <b-modal id="modal-1" title="Criar Desafio" @cancel="clear" @ok="register" ok-title="Criar">
        <b-row class="justify-content-md-center">
          <b-form>
            <b-form-group
              id="input-group-username"
              label="Username:"
              label-for="input-username">

              <b-form-input
                id="input-username"
                v-model="user.username"
                type="text"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-email"
              label="Email:"
              label-for="input-email">

              <b-form-input
                id="input-email"
                v-model="user.email"
                type="email"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-password"
              label="Password:"
              label-for="input-password">

              <b-form-input
                id="input-password"
                v-model="user.password"
                type="Password"
                required>
              </b-form-input>
            </b-form-group>

             <b-form-group
              id="input-group-password-again"
              label="Password:"
              label-for="input-password-again">

              <b-form-input
                id="input-password-again"
                v-model="user.password2"
                type="Password"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Tipo:"
              label-align-sm="left"
              label-for="txtImg">
                <b-form-select id="filterUserType" 
                v-model="user.type"
                :options="getAllUserTypes"
                size="sm" required>
                </b-form-select>
            </b-form-group>

          </b-form>
        </b-row>
      </b-modal>

         <!-- FORMULÁRIO EDITAR UTILIZADOR -->
      <b-modal id="modal-2" title="Editar Desafio" @ok="editUser" ok-title="Editar">
        <b-row class="justify-content-md-center">
          <b-form>
            <b-form-group
              id="input-group-username-2"
              label="Username:"
              label-for="input-username-2">

              <b-form-input
                id="input-username-2"
                v-model="user.username"
                type="text"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-email-2"
              label="Email:"
              label-for="input-email-2">

              <b-form-input
                id="input-email-2"
                v-model="user.email"
                type="email"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-password-2"
              label="Password:"
              label-for="input-password-2">

              <b-form-input
                id="input-password-2"
                v-model="user.password"
                type="Password"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-password-again-2"
              label="Password (novamente):"
              label-for="input-password-again-2">

              <b-form-input
                id="input-password-again-2"
                v-model="user.password2"
                type="Password"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Tipo:"
              label-align-sm="left"
              label-for="txtImg">
                <b-form-select id="filterUserType2" 
                v-model="user.type"
                :options="getAllUserTypes"
                size="sm" required>
                </b-form-select>
            </b-form-group>

            
          </b-form>
        </b-row>
      </b-modal>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        password2: "",
        type: ""
      },
      filterUserTypeSelected: "all",
      search: "",
      ErrorMsg: "",
    };
  },
  methods: {
    register() {
      try {
        if(this.user.password == this.user.password2){
          this.$store.dispatch('register',{
            id: this.$store.getters.getNextUserId,
            username: this.user.username,
            email: this.user.email,
            password: this.user.password,
            type: this.user.type})
        }else{
          throw Error("Passwords não coincidem.");
        }
      } catch (error) {
        this.ErrorMsg = error
      }
      this.user.username = "";
      this.user.email = "";
      this.user.password = "";
      this.user.password2 = "";
      this.user.type = "";
    },
    clear(){
      this.user.username = "";
      this.user.email = "";
      this.user.password = "";
      this.user.password2 = "";
      this.user.type = "";
    },
    deleteUser(event) {
      this.$store.dispatch("deleteUser", event.target.id);
    },
    editOpen(event){
      this.user = this.$store.getters.getUserById(event.target.id);
    },
    editUser() {
      const newUser = {
        id: this.user.id,
        username: this.user.username,
        email: this.user.email,
        password: this.user.img,
        type: this.user.type
      };
      this.$store.dispatch("updateUser", newUser);
    }
  },
   computed: {
    getAllUsers() {
      return this.$store.getters.getUsersFiltered(1,
        this.filterUserTypeSelected, this.search);
    },
    getAllUserTypes() {
      return this.$store.getters.getUserTypesForSelect;
    },
  }
};
</script>
<style>
#users-admin {
  margin-top: 130px;
  margin-bottom: 385px;
}

#users-admin #btnAdd {
  padding: 0px 10px 0px 10px;
  font-weight: 600;
  font-size: 20px;
  color: black;
  border: 2px solid;
  background-color: #ebceff;
  border-radius: 20px;
}

#users-admin .modal-lg {
    max-width: 5px !important;
}

#users-admin .info{
  color: black;
  font-weight: 500;
  font-size: 12pt;
  font-family: 'Consolas';
  margin-top: 10px;
}

</style>