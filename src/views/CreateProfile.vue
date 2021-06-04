<template>
  <div id="profile">
    <b-modal
      size="lg"
      visible
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      no-fade
    >
      <label class="title-create">Cria o teu Perfil</label>
      <b-form @submit.prevent="register" id="formCreateProfile" class=" mb-5">
        <!-- Accept specific image formats by extension -->
        <label for="file-input">
          <b-img
            class="w-50 mt-3"
            src="../assets/profile-picture2.png"
            alt="Profile image"
          ></b-img>
        </label>
        <b-form-file
          id="file-input"
          class="d-none"
          accept=".jpg, .png, .gif"
          plain
        ></b-form-file
        ><br />
        <!--NAME-->
        <label class="lblFields">Nome</label>
        <label class="lblName">*</label>
        <b-form-input
          id="txtName"
          v-model="form.name"
          type="text"
          placeholder="Nome"
          required
        ></b-form-input
        ><br />
        <!--BIOGRAPHY-->
        <b-form-textarea
          id="textarea-small"
          size="sm"
          placeholder="Escreve uma biografia sobre ti..."
        ></b-form-textarea
        ><br />
        <!--LOCALITY-->
        <b-form-input
          id="txtLocality"
          v-model="form.locality"
          type="text"
          placeholder="Localidade"
        ></b-form-input
        ><br />
        <!--SCHOOL-->
        <b-form-input
          id="txtSCHOOL"
          v-model="form.school"
          type="text"
          placeholder="Escola"
        ></b-form-input
        ><br />
        <!--URL-->
        <b-form-input
          id="txtUrl"
          v-model="form.url"
          type="text"
          placeholder="Url"
        ></b-form-input
        ><br />
        <label class="errorMsg">{{ ErrorMsg }}</label>
        <label class="lblFields">Campos com (*) são obrigatórios.</label>
        <b-button id="btnContinue" type="submit" class="text-center"
          >Continuar</b-button
        ><br />
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      id: this.$store.getters.getNextUserId,
      form: {
        username: "",
        email: "",
        password: ""
      },
      type: 2,
      ErrorMsg: ""
    };
  },
  methods: {
    CreateProfile() {
      try {
        if (this.form.password == this.form.password2) {
          // Chamar a ação register que está na Store
          this.$store.dispatch("register", {
            id: this.id,
            username: this.form.username,
            email: this.form.email,
            password: this.form.password,
            type: this.type
          });
          // Saltar para a view Home
          this.$router.push({ name: "Login" });
        } else {
          throw Error("Passwords não coincidem.");
        }
      } catch (error) {
        this.ErrorMsg = error;
      }
    }
  }
};
</script>

<style>
#profile {
  /*background-image: url('../assets/background.jpg');*/
  margin-top: 150px;
}

.errorMsg {
  font-weight: 600;
  margin-bottom: 15px;
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
  margin: 0px 5px 0px 5px;
  font-family: Consolas;
  font-size: 13px;
  color: red;
  float: right;
}

.lblFields {
  display: flex;
  margin: 10px 0px 0px 5px;
  font-family: Consolas;
  font-size: 15px;
  color: rgb(105, 105, 105);
  font-weight: 600;
}

.title-create {
  margin: 5px 20px 10px 0px;
  display: flex;
  justify-content: start;
  font-weight: 600;
  font-family: Consolas;
  font-size: 23px;
  color: black;
}
</style>
