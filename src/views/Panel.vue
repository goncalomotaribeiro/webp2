<template>
  <div id="panel">
    <!--CAPA-->
    <b-container fluid id="cover" width="1356px" height="347px">
      <b-row>
        <b-col>
          <b-img
            class="level mt-5"
            src="../assets/level.png"
            fluid
            alt="Fluid image"
            width="93px"
            height="122px"
          ></b-img>
        </b-col>
      </b-row>
      <b-row class="text-left" lg>
        <b-col cols="lg-2" class="d-flex justify-content-center mb-3">
          <b-img
            class="profile-picture mt-3"
            src="../assets/profile-picture2.png"
            fluid
            alt="Fluid image"
            width="164px"
            height="164px"
          ></b-img>
        </b-col>
        <b-col cols="xl-7" class="d-flex justify-content-center flex-column">
          <b-row class="info1">
            <b-col>{{ user2.name }}<span> Estudante</span> </b-col> </b-row
          ><br />
          <b-row class="info2" style="padding-top: 10px; padding-bottom: 10px">
            <b-col>
              <b-img
                src="../assets/hat.png"
                fluid
                alt="Fluid image"
                class="mr-2"
              ></b-img
              >{{ user2.points }} <br class="d-lg-none" /><span>Pontos</span>
            </b-col>
            <b-col>
              {{ user2.followers }} <br class="d-lg-none" /><span
                >Seguidores</span
              >
            </b-col>
            <b-col>
              {{ user2.following }} <br class="d-lg-none" /><span
                >A seguir</span
              >
            </b-col>
          </b-row>
        </b-col>
        <b-col
          class="d-flex justify-content-center align-items-lg-end justify-content-lg-end mb-xl-4 pb-xl-2 mt-4"
        >
          <b-button
            id="btnEditProfile"
            @click="editProfile()"
            v-if="nav"
            to="/panel/edit-profile"
            >Editar Perfil</b-button
          >
        </b-col>
      </b-row>
    </b-container>

    <b-container fluid id="tab" v-if="nav">
      <b-row class="text-left">
        <b-col>
          <b-button
            id="btnMyChallenges"
            class="btnMenu"
            to="/panel/my-challenges"
            >Meus Desafios</b-button
          >
          <b-button id="btnMyEvents" class="btnMenu ml-4" to="/panel/my-events"
            >Meus Eventos</b-button
          >
          <b-button id="btnResults" class="btnMenu ml-4" to="/panel/results"
            >Resultados</b-button
          >
        </b-col>
      </b-row>
      <router-view></router-view>
    </b-container>

    <b-container v-else class="mt-5">
      <b-row class="text-left">
        <b-col>
          <b-button
            id="btnEditProfile"
            @click="leaveEditProfile()"
            to="/panel/my-challenges"
            >Voltar</b-button
          >
        </b-col>
      </b-row>
      <router-view></router-view>
    </b-container>

    <!-- MODAL -->
    <b-modal
      v-if="showModal"
      visible
      size="lg"
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      no-fade
    >
      <label class="label-create">Cria o teu Perfil...</label>
      <b-form
        @submit.prevent="handleCreateProfile"
        id="formCreateProfile"
        class="mb-5"
      >
        <!-- Accept specific image formats by extension -->
        <label for="file-input">
          <b-img
            class="w-50 mt-3 mb-3"
            src="../assets/profile-picture2.png"
            alt="Profile image"
          ></b-img>
        </label>
        <b-form-file
          name="pic"
          id="file-input"
          v-model="user.profile_picture"
          class="d-none"
          accept=".jpg, .png"
          plain
        ></b-form-file
        ><br />
        <!-- <label class="lblFields" v-if="user.profile_picture">{{user.profile_picture.name}}</label> -->

        <!--NAME-->
        <b-row>
          <b-col sm>
            <label class="lblName">*</label>
            <label class="lblFields">Nome</label>
            <b-form-input
              id="txtName"
              v-model="user.name"
              type="text"
              placeholder="nome"
              required
            ></b-form-input
            ><br />
          </b-col>
          <b-col>
            <!--LOCALITY-->
            <label class="lblFields">Localidade</label>
            <b-form-input
              id="txtLocality"
              v-model="user.location"
              type="text"
              placeholder="localidade"
            ></b-form-input
            ><br />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm>
            <!--SCHOOL-->
            <label class="lblFields">Escola</label>
            <b-form-input
              id="txtSCHOOL"
              v-model="user.school"
              type="text"
              placeholder="escola"
            ></b-form-input
            ><br />
          </b-col>
          <b-col>
            <!--URL-->
            <label class="lblFields">Url</label>
            <b-form-input
              id="txtUrl"
              v-model="user.url"
              type="text"
              placeholder="url"
            ></b-form-input
            ><br />
          </b-col>
        </b-row>

        <!--BIOGRAPHY-->
        <label class="lblFields">Biografia</label>
        <b-form-textarea
          id="textarea-small"
          v-model="user.biography"
          size="sm"
          placeholder="escreve uma biografia sobre ti..."
        ></b-form-textarea
        ><br />

        <label class="lblFields">Campos com (*) são obrigatórios.</label>

        <!--MESSAGE-->
        <label
          v-if="message"
          :class="successful ? 'successMsg' : 'errorMsgRegister'"
          >{{ message }}</label
        ><br />

        <b-button id="btnContinue" :disabled="loading" type="submit">
          <span v-show="loading" class="spinner-border spinner-border-sm">
          </span>
          <span>Continuar</span> </b-button
        ><br />
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

class User {
  constructor(id, profile_picture, name, location, school, url, biography) {
    this.id = id;
    this.profile_picture = profile_picture;
    this.name = name;
    this.location = location;
    this.school = school;
    this.url = url;
    this.biography = biography;
  }
}

export default {
  name: "Panel",
  data() {
    return {
      user: new User(
        this.$store.getters.getLoggedUser.id,
        null,
        null,
        null,
        null,
        null,
        null
      ),
      successful: false,
      message: "",
      loading: false,
      modal: true,
      errors: [],
      user2: [],
      nav: true,
    };
  },
  async mounted() {
    this.getUserInfo();
    let nav = JSON.parse(localStorage.getItem("nav"));
    if (nav!=null) {
      this.nav=false
    }
  },
  computed: {
    ...mapGetters(["getMessage", "getLoggedUser", "getUser"]),
    showModal() {
      if (
        this.$store.getters.getLoggedUser.user_type === "STUDENT" &&
        this.user2.name === ""
      ) {
        return this.modal;
      } else {
        return !this.modal;
      }
    },
  },
  methods: {
    //dispatch 'editProfile' Action to Vuex Store
    async handleCreateProfile() {
      this.message = "";
      this.loading = true;
      this.successful = false;
      this.errors = [];

      try {
        await this.$store.dispatch("editProfile", this.user);
        console.log("UPDATE OK");
        this.message = this.$store.getters.getMessage;
        this.successful = true;
        this.modal = false;
        this.getUserInfo();
      } catch (error) {
        console.log(error);
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      } finally {
        this.loading = false;
        this.$router.go()
      }
    },

    editProfile() {
      this.nav = false;
    },

    leaveEditProfile() {
      localStorage.removeItem("nav");
      this.nav = true;
    },

    async getUserInfo() {
      try {
        await this.$store.dispatch(
          "getUserById",
          this.$store.getters.getLoggedUser.id
        );
        this.user2 = this.getUser;
      } catch (error) {
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    },
  },
};
</script>

<style>
#cover {
  padding-bottom: 5px;
  margin-top: 67px;
  border-radius: 30px;
  background-image: url("../assets/profile-cover.png");
  background-position: center;
}

.info1,
.info2 {
  box-shadow: #8088ff 6px 6px;
  font-weight: 600;
  background-color: #ffffff;
  border-radius: 7px;
  padding: 7px 5px 7px 5px;
  color: black;
  font-size: 17px;
  font-family: "Consolas";
}

.info1 span,
.info2 span {
  font-weight: 500;
}

#btnEditProfile {
  margin-right: 25px;
  background-color: white;
  border-radius: 20px;
  color: black;
  font-weight: 600;
  border: 2px solid;
  font-family: "Consolas";
  font-size: 12px;
}

@media only screen and (min-width: 500px) {
  .profile-picture {
    width: 70%;
  }
}

@media only screen and (min-width: 1000px) {
  #cover {
    width: 1200px;
  }

  #tab {
    width: 1200px;
  }

  .level {
    width: 7%;
  }

  .info1 {
    width: 50%;
  }

  .info2 {
    width: 90%;
  }

  #tab {
    margin-top: 100px;
  }
}

#tab .btnMenu {
  background-color: #ececec;
  padding: 9px 20px 9px 20px;
  border-radius: 6px;
  color: black;
  font-weight: 600;
  border: 2px solid white;
  font-family: "Segoe UI";
  font-size: 17px;
}

@media only screen and (max-width: 1000px) {
  .profile-picture {
    width: 25%;
  }

  #cover {
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 30px;
  }

  #tab .btnMenu {
    padding: 5px 15px 5px 15px;
    font-size: 15px;
  }

  #tab {
    margin-top: 50px;
  }
}

#tab .router-link-exact-active {
  background-color: white;
  border: 2px solid;
}

.label-create {
  margin: 10px 20px 10px 10px;
  font-family: Consolas;
  font-size: 18px;
  color: black;
  font-weight: 600;
}

.errorMsg {
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  justify-content: start;
  color: rgb(255, 100, 100);
  font-family: Consolas;
  font-size: 14px;
}

.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

/*MODAL*/
#btnContinue {
  font-weight: 500;
  background-color: #fff7d7;
  border: 2px solid;
  border-radius: 7px;
  padding: 7px 43px 7px 43px;
  margin: 6px;
  color: black;
  text-decoration: none;
  text-align: center;
  font-size: 15px;
  font-family: "Segoe UI";
  text-align: center;
}

body .form-input {
  width: 1000px;
}

#formCreateProfile {
  text-align: center;
}

.modal-content {
  border: black 12px solid;
  border-radius: 10px;
  box-shadow: #ebceff 10px 10px;
  margin-top: 100px;
}

.lblName {
  display: flex;
  margin: 20px 0px 0px 5px;
  font-family: Consolas;
  font-size: 13px;
  color: red;
  float: right;
}

.lblFields {
  display: flex;
  margin: 5px 0px 5px 5px;
  font-family: Consolas;
  font-size: 14px;
  color: rgb(105, 105, 105);
}
</style>
