<template>
  <div id="myChallenges">
    <!--EDIT PROFILE-->
    <b-form
      @submit.prevent="handleEditUser"
      id="formEditProfile"
      class="mb-5 mt-5"
    >
      <b-row>
        <label class="label-create float-left">Editar Perfil</label>
      </b-row>

      <!--USERNAME-->
      <b-row>
        <b-col sm>
          <label class="lblFields">Username</label>
          <b-form-input
            id="txtUsername"
            v-model="user2.username"
            type="text"
            placeholder="Username"
            required
            disabled
          ></b-form-input
          ><br />
        </b-col>

        <!--EMAIL-->
        <b-col>
          <label class="lblFields">Email</label>
          <b-form-input
            id="txtEmail"
            v-model="user2.email"
            type="text"
            placeholder="Email"
            required
            disabled
          ></b-form-input
          ><br />
        </b-col>
      </b-row>

      <!--NAME-->
      <b-row>
        <b-col sm>
          <!--BIOGRAPHY-->
          <label class="lblFields">Biografia</label>
          <b-form-textarea
            id="textarea-small"
            v-model="user2.biography"
            size="sm"
            placeholder="Escreve uma biografia sobre ti..."
          ></b-form-textarea
          ><br />
        </b-col>
        <b-col>
          <label class="lblFields">Nome</label>
          <b-form-input
            id="txtName"
            v-model="user2.name"
            type="text"
            placeholder="Nome"
            required
          ></b-form-input
          ><br />
        </b-col>
      </b-row>

      <!--URL-->
      <b-row>
        <b-col sm>
          <label class="lblFields">Url</label>
          <b-form-input
            id="txtUrl"
            v-model="user2.url"
            type="text"
            placeholder="Url"
          ></b-form-input
          ><br />
        </b-col>
        <b-col>
          <label class="lblFields">Localidade</label>
          <b-form-input
            id="txtLocalition"
            v-model="user2.location"
            type="text"
            placeholder="Localidade"
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

      <b-button
        id="btnChangeProfile"
        class="btnChange float-left"
        :disabled="loading"
        type="submit"
      >
        <span v-show="loading" class="spinner-border spinner-border-sm"> </span>
        <span>Guardar Alterações</span> </b-button
      ><br />
    </b-form>

    <!--EDIT PASSWORD-->
    <b-form
      @submit.prevent="handleEditPassword"
      id="formEditPassword"
      class="mb-5 mt-5"
    >
      <b-row>
        <label class="label-create float-left mt-5"
          >Alterar Palavra-passe</label
        >
      </b-row>

      <!--NOVA PALAVRA-PASSE-->
      <b-row>
        <b-col sm>
          <label class="lblFields">Nova palavra-Passe</label>
          <b-form-input
            id="txtPassword"
            v-model="password"
            type="password"
            placeholder=" Nova palavra-passe"
            required
          ></b-form-input
          ><br />
        </b-col>
        <!--NOVA PALAVRA-PASSE (NOVAMENTE)-->
        <b-col>
          <label class="lblFields">Nova palavra-Passe (novamente)</label>
          <b-form-input
            id="txtPassword2"
            v-model="password2"
            type="password"
            placeholder="Nova palavra-passe (novamente)"
            required
          ></b-form-input
          ><br />
        </b-col>
      </b-row>

      <!--MESSAGE-->
      <label
        v-if="message2"
        :class="successful2 ? 'successMsg' : 'errorMsgRegister'"
        >{{ message2 }}</label
      ><br />

      <b-button
        id="btnChangePass"
        class="btnChange float-left"
        :disabled="loading2"
        type="submit"
      >
        <span v-show="loading2" class="spinner-border spinner-border-sm">
        </span>
        <span>Alterar Palavra-passe</span> </b-button
      ><br />
    </b-form>

    <!--DELETE USER-->
    <b-row>
      <label class="label-create float-left mt-5">Apagar Conta</label>
    </b-row>
    <label class="lblFields mb-5"
      >Apagar a conta, incluido toda a atividade na aplicação.</label
    >
    <b-button
      class="float-left"
      :disabled="loading2"
      @click="handleDeleteUser"
      id="btnDeleteAccount"
    >
      <span v-show="loading2" class="spinner-border spinner-border-sm"> </span>
      <span>Apagar Conta</span> </b-button
    ><br />
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      successful: false,
      successful2: false,
      message: "",
      message2: "",
      loading: false,
      loading2: false,
      errors: [],
      user2: [],
      password2: "",
      password: "",
    };
  },
  methods: {
    //dispatch 'editProfile' Action to Vuex Store
    async handleEditUser() {
      this.message = "";
      this.loading = true;
      this.successful = false;
      this.errors = [];

      try {
        await this.$store.dispatch("editProfile", this.user2);
        console.log("UPDATE OK");
        this.message = this.$store.getters.getMessage;
        this.successful = true;
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

    //dispatch 'editProfile' Action to Vuex Store
    async handleEditPassword() {
      this.message2 = "";
      this.loading2 = true;
      this.successful2 = false;
      this.errors = [];

      if (this.password2 === this.password) {
        try {
          this.user2.password = this.password;
          await this.$store.dispatch("editProfile", this.user2);
          console.log("UPDATE OK");
          this.message2 = this.$store.getters.getMessage;
          this.successful2 = true;
        } catch (error) {
          console.log(error);
          this.message2 =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        } finally {
          this.loading2 = false;
        }
      } else {
        this.message2 = "Passwords não coincidem!";
        this.loading2 = false;
      }
    },
    handleDeleteUser() {
      if (confirm("Tens a certeza que pretendes apagar a tua conta?")) {
        this.$store.dispatch(
          "deleteUser",
          this.$store.getters.getLoggedUser.id
        );
        this.$store.dispatch("logout");
        this.$router.push("/login");
      }
    },
    async getUserInfo() {
      try {
        await this.$store.dispatch(
          "getUserById",
          this.$store.getters.getLoggedUser.id
        );
        this.user2 = this.getUser;
        console.log(this.user2);
      } catch (error) {
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    },
  },
  computed: {
    ...mapGetters(["getMessage", "getLoggedUser", "getUser"]),
  },
  async mounted() {
    this.getUserInfo();
    let nav = JSON.parse(localStorage.getItem("nav"));
    if (nav != false) {
      localStorage.setItem("nav", JSON.stringify(false));
    }
  },
};
</script>
<style>
#myChallenges .info {
  margin-top: 100px;
  font-weight: 500;
  background-color: white;
  color: rgb(73, 73, 73);
  font-size: 12pt;
  font-family: "Consolas";
  border: 1px solid rgb(73, 73, 73);
}

#myChallenges .info:hover {
  box-shadow: #ebceff 6px 6px;
}

#myChallenges .btnChange {
  font-weight: 500;
  background-color: #ffffff;
  border: 2px solid;
  border-radius: 7px;
  padding: 6px 20px 6px 20px;
  margin: 6px;
  color: black;
  text-decoration: none;
  text-align: center;
  font-size: 15px;
  font-family: "Segoe UI";
  text-align: center;
}

#btnDeleteAccount {
  background-color: #ffccc3;
  font-weight: 500;
  border: 2px solid;
  border-radius: 7px;
  padding: 6px 20px 6px 20px;
  margin: 6px;
  color: black;
  text-decoration: none;
  text-align: center;
  font-size: 15px;
  font-family: "Segoe UI";
  text-align: center;
}
</style>
