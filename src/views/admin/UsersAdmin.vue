<template>
  <div id="users-admin">
    <h3>Gestão de Utilizadores</h3>
    <br /><br />

    <!-- USERS FILTERS -->
    <b-container id="usersTable">
      <b-row class="text-left d-flex align-items-center">
        <b-col cols="3">
          <!-- ADD USER -->
          <b-button id="btnAdd" class="mr-3" v-b-modal.modal-1 @click="clear()"
            >+</b-button
          >
          <label for="">Adicionar</label>
        </b-col>
        <b-col>
          <!-- SELECT USER TYPE -->
          <b-row>
            <b-col cols="0"><label for="">Tipo:</label></b-col>
            <b-col>
              <b-form-select
                id="filterUserType"
                class="btnMenu2 ml-4"
                v-model="filterUserTypeSelected"
                :options="optionsFilterUser"
                size="sm"
              >
                <template #first>
                  <b-form-select-option value="all">Todos</b-form-select-option>
                </template>
              </b-form-select>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <!-- SEARCH USER -->
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

      <!-- USERS TABLE -->
      <table class="table table-striped table-bordered" sticky-header>
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Nome</th>
            <th scope="col">Palavra-passe</th>
            <th scope="col">Tipo</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody columns v-if="getAllUsers.length > 0">
          <tr v-for="(user, index) in getAllUsers" :key="index">
            <td class="align-middle">{{ user.id }}</td>
            <td class="align-middle">{{ user.username }}</td>
            <td class="align-middle">{{ user.email }}</td>
            <td class="align-middle">{{ user.name }}</td>
            <td class="align-middle">{{ user.password }}</td>
            <td class="align-middle">{{ user.id_type }}</td>
            <td class="align-middle">
              <b-button
                @click="editOpen"
                :id="user.id"
                variant="info"
                class="mb-3"
                v-b-modal.modal-2
                >Editar</b-button
              >
              <b-button @click="handleDeleteUser" :id="user.id" variant="danger"
                >Apagar</b-button
              >
            </td>
          </tr>
        </tbody>
        <p v-else class="info">Não existem Utilizadores criados</p>
      </table>

      <!-- FORMULÁRIO CRIAR UTILIZADOR -->
      <b-modal hide-header hide-footer id="modal-1">
        <label class="label-create mb-5">Criar conta...</label>
        <b-form
          @submit.prevent="handleRegister"
          id="formCreateProfile"
          class="mb-5"
        >
          <!--USERNAME-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Username</label>
              <b-form-input
                id="txtUsername"
                v-model="user.username"
                type="text"
                placeholder="username"
                required
              ></b-form-input
              ><br />
            </b-col>

            <!--EMAIL-->
            <b-col>
              <label class="lblFields">Email</label>
              <b-form-input
                id="txtEmail"
                v-model="user.email"
                type="text"
                placeholder="email"
                required
              ></b-form-input
              ><br />
            </b-col>
          </b-row>

          <!--NAME-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Nome</label>
              <b-form-input
                id="txtNome"
                v-model="user.name"
                type="text"
                placeholder="nome"
                required
              ></b-form-input
              ><br />
            </b-col>
            <b-col>
              <!--USER TYPE-->
              <label class="lblFields">Tipo de Utilizador</label>
              <b-form-group>
                <b-form-select
                  id="filterUserType"
                  v-model="user.user_type"
                  :options="optionsCreateUser"
                  size="sm"
                  required
                >
                </b-form-select> </b-form-group
              ><br />
            </b-col>
          </b-row>

          <!--PASSWORD-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Palavra-passe</label>
              <b-form-input
                id="txtPassword"
                v-model="user.password"
                type="password"
                placeholder="palavra-passe"
                required
              ></b-form-input
              ><br />
            </b-col>
            <b-col>
              <!--PASSWORD2-->
              <label class="lblFields">Palavra-passe (novamente)</label>
              <b-form-input
                id="txtPassword2"
                v-model="password2"
                type="password"
                placeholder="palavra-passe (novamente)"
                required
              ></b-form-input
              ><br />
            </b-col>
          </b-row>

          <!--MESSAGE-->
          <label
            v-if="message"
            :class="successful ? 'successMsg' : 'errorMsgRegister'"
            >{{ message }}</label
          ><br />

          <b-button id="btnContinue" :disabled="loading" type="submit">
            <span v-show="loading" class="spinner-border spinner-border-sm">
            </span>
            <span>Criar</span> </b-button
          ><br />
        </b-form>
      </b-modal>

      <!-- FORMULÁRIO EDITAR UTILIZADOR -->
      <b-modal id="modal-2" title="Editar Utilizador" hide-header hide-footer>
        <label class="label-create mb-5">Editar conta...</label>
        <b-form
          @submit.prevent="handleEditUser"
          id="formEditProfile"
          class="mb-5"
        >
          <!--USERNAME-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Username</label>
              <b-form-input
                id="txtUsername"
                v-model="user.username"
                type="text"
                placeholder="username"
                required
              ></b-form-input
              ><br />
            </b-col>

            <!--EMAIL-->
            <b-col>
              <label class="lblFields">Email</label>
              <b-form-input
                id="txtEmail"
                v-model="user.email"
                type="text"
                placeholder="email"
                required
              ></b-form-input
              ><br />
            </b-col>
          </b-row>

          <!--NAME-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Nome</label>
              <b-form-input
                id="txtNome"
                v-model="user.name"
                type="text"
                placeholder="nome"
                required
              ></b-form-input
              ><br />
            </b-col>
            <b-col>
              <!--USER TYPE-->
              <label class="lblFields">Tipo de Utilizador</label>
              <b-form-group>
                <b-form-select
                  id="filterUserType"
                  v-model="user.id_type"
                  :options="optionsFilterUser"
                  size="sm"
                  required
                >
                </b-form-select> </b-form-group
              ><br />
            </b-col>
          </b-row>

          <!--PASSWORD-->
          <!-- <label class="lblFields">Password</label>
          <b-form-input
            id="txtPassword"
            v-model="user.password"
            type="password"
            placeholder="Password"
            required
          ></b-form-input
          ><br /> -->

          <!--MESSAGE-->
          <label
            v-if="message"
            :class="successful ? 'successMsg' : 'errorMsgRegister'"
            >{{ message }}</label
          ><br />
          
          <b-button id="btnContinue" :disabled="loading" type="submit">
            <span v-show="loading" class="spinner-border spinner-border-sm">
            </span>
            <span>Editar</span> </b-button
          ><br />
        </b-form>
      </b-modal>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

class User {
  constructor(username, email, password, name, user_type) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.name = name;
    this.user_type = user_type;
  }
}

export default {
  data() {
    return {
      optionsCreateUser: [
        { value: "ADMIN", text: "Admin" },
        { value: "STUDENT", text: "Student" },
        { value: "TEACHER", text: "Teacher" },
      ],
      optionsFilterUser: [
        { value: 1, text: "Admin" },
        { value: 2, text: "Student" },
        { value: 3, text: "Teacher" },
      ],
      user: new User(null, null, null, null, null),
      password2: "",
      successful: false,
      message: "",
      loading: false,
      errors: [],
      filterUserTypeSelected: "all",
      search: "",
      users: [],
    };
  },
  methods: {
    //dispatch 'getAllUsers' Action to Vuex Store
    async getUsersList() {
      this.loading = true;
      try {
        await this.$store.dispatch("getAllUsers");
        this.users = this.getUsers;
      } catch (error) {
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      } finally {
        this.loading = false;
      }
    },

    //dispatch 'register' Action to Vuex Store
    async handleRegister() {
      this.message = "";
      this.loading = true;
      this.successful = false;
      this.errors = [];

      if (this.user.password == this.password2) {
        try {
          await this.$store.dispatch("register", this.user);
          this.message = this.$store.getters.getMessage;
          this.successful = true;
          this.$router.go()
        } catch (error) {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        } finally {
          this.loading = false;
        }
      } else {
        this.message = "Passwords não coincidem!";
        this.loading = false;
      }
    },

    //dispatch 'editProfile' Action to Vuex Store
    async handleEditUser() {
      this.message = "";
      this.loading = true;
      this.successful = false;
      this.errors = [];

      try {
        await this.$store.dispatch("editProfile", this.user);
        this.message = this.$store.getters.getMessage;
        this.successful = true;
        this.modal = false;
        this.$router.go()
      } catch (error) {
        console.log(error);
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      } finally {
        this.loading = false;
      }
    },

    clear() {
      this.user.username = "";
      this.user.email = "";
      this.user.name = "";
      this.user.password = "";
      this.password2 = "";
      this.user.user_type = "";
      this.message = "";
    },

    handleDeleteUser(event) {
      if (confirm("Tem a certeza que pretende apagar o utilizador?")) {
        this.$store.dispatch("deleteUser", event.target.id);
        this.$router.go()
      }
    },

    async editOpen(event) {
      await this.$store.dispatch("getUserById", event.target.id);
      this.user = this.getUser;
      this.message = "";
    },
  },
  computed: {
    ...mapGetters(["getMessage", "getUsers", "getUser"]),

    getAllUsers() {
      return this.$store.getters.getUsersFiltered(
        1,
        this.filterUserTypeSelected,
        this.search
      );
    },
  },
  created() {
    this.getUsersList();
  },
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

#users-admin .info {
  color: black;
  font-weight: 500;
  font-size: 12pt;
  font-family: "Consolas";
  margin-top: 10px;
}
</style>
