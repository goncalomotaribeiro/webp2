<template>
  <div id="challenge">
    <b-container
      fluid
      class="cover"
    >
    </b-container>

    <b-container>
      <b-row>
        <b-col cols="4" class="mt-5">
          <b-img
            class="profile-picture mt-3 mb-3"
            src="../../assets/picture-teacher.png"
            fluid
            alt="Fluid image"
          ></b-img>
          <p class="name mb-2">{{ user.name }}</p>
          <p class="type mb-3">Docente</p>
          <b-button class="follow">Seguir</b-button>
        </b-col>
        <b-col cols="0">
          <div class="linha align-self-center d-none d-xl-block"></div>
        </b-col>
        <b-col cols="7" class="text-left ml-5 info">
          <span class="challengeName">{{ challenge.title }}</span>
          <span class="name d-flex justify-content-end">{{ date }}</span>
          <p class="challengeDescript mt-3">
            Lorem ipsum dolor sit amet, consecteLorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed lacinia in tortor id interdum.
            Quisque vitae pharetra dui. Curabitur rutrum pellentesque vulputate.
            Praesent lacinia est felis, ut bibendum est placerat ac. Nam non
            laoreet augue. Vivamus sagittis metus in feugiat interdum. Duis ac
            posuere justo, eget congue lorem. Nam fringilla risus scelerisque
            metus volutpat aliquam. Phasellus orci nulla, tempor in erat vitae,
            sodales lobortis sem.tur adipiscing elit...
          </p>
          <span v-if="state.state == 'Aberto'">
            <b-button
              id="btnSubmit"
              class="btnSubmitStyle mt-3"
              v-b-modal.modal-1
              v-if="isSubmited == 'false'"
              @click="clear()"
            >
              Submeter
              <b-img
                src="../../assets/arrow-right-xs.png"
                fluid
                alt="Fluid image"
                class="ml-5 mb-1"
              ></b-img>
            </b-button>
            <b-button id="btnSubmited" class="btnSubmitedStyle mt-3" v-else>
              Submetido
            </b-button>
          </span>
        </b-col>
      </b-row>

          <!-- CREATE SUBMISSION -->
      <b-modal  hide-footer id="modal-1">
        <label class="label-create">Participar no desafio!</label>
        <b-form
          @submit.prevent="handleCreateSubmission"
          id="formEditSubmission"
          class="mb-5"
          enctype="multipart/form-data"
        >
          <!--URL-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Url</label>
              <b-form-input
                id="txtUrl"
                v-model="submission.url"
                type="text"
                placeholder="url"
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
            <span>Submeter</span> </b-button
          ><br />
        </b-form>
      </b-modal>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

class Submission {
  constructor(
    url,
    date,
    classification,
    id_challenge
  ) {
    this.url = url;
    this.date = date;
    this.classification = classification;
    this.id_challenge = id_challenge
  }
}

export default {
  name: "Challenge",
  data() {
    return {
      submission: new Submission(
        null,
        null,
        null,
        null
      ),
      challenge: [],
      state: [],
      user: [],
      date: "",
      successful: false,
      message: "",
      loading: false,
      errors: [],
      isSubmited: ""
    };
  },
  methods: {
    //dispatch 'createSubmission' Action to Vuex Store
    async handleCreateSubmission() {
      this.message = "";
      this.loading = true;
      this.successful = false;
      this.errors = [];

      this.submission.date = new Date().toLocaleString()
      this.submission.id_challenge = this.$route.params.challengeId;
      try {
        await this.$store.dispatch("createSubmission", this.submission);
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
        this.submission.url = "";
      }
    },
    async handleGetChallenge() {
      await this.$store.dispatch("getChallengeById", this.$route.params.challengeId);
      this.challenge = this.getChallenge;
      this.state = this.challenge.state
      this.user = this.challenge.user
      this.challenge.date_ini = this.challenge.date_ini.substring(0,this.challenge.date_ini.length-8);
      this.challenge.date_end = this.challenge.date_end.substring(0,this.challenge.date_end.length-8);

      const monthNames = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
      "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
      ];
 

      if(this.state.state != "Aberto")
      {
        this.date = new Date(this.challenge.date_ini);

        let day = this.date.getDate()
        let hours = this.date.getUTCHours()
        let minutes = this.date.getUTCMinutes()

        this.date = day + " " + monthNames[this.date.getMonth()] + " " + hours + ":" + minutes
      }else{
        this.date = new Date(this.challenge.date_end);

        let day = this.date.getDate()
        let hours = this.date.getUTCHours()
        let minutes = this.date.getUTCMinutes()

        if(minutes == 0){minutes=minutes+"0"}

        this.date = "Encerra - " + day + " " + monthNames[this.date.getMonth()] + " " + hours + ":" + minutes
      }
    },

    async submited() {
      try {
        await this.$store.dispatch("getSubmissionByIdChallenge",  { id_challenge: this.$route.params.challengeId, id_user: this.$store.getters.getLoggedUser.id});
        this.submission = this.getSubmission;
      
        if(this.submission.submissions.length > 0){
             this.isSubmited = "true";
        }else{
          this.isSubmited = "false";
        }
      } catch (error) {
        
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    },

    clear(){
      this.message = "";
    }
  },
  computed: {
    ...mapGetters(["getMessage", "getChallenges", "getChallenge", "getSubmissions", "getSubmission"]),
  },
  created(){
    this.handleGetChallenge();
    this.submited();
  }
};
</script>
<style>
#challenge .cover {
  background-image: url("../../assets/challenge1.jpg");
  height: 230px;
  margin-top: 67px;
  border-radius: 15px;
  box-shadow: #ebceff 6px 6px;
  border: 1px solid #ebceff;
  background-position: center;
  background-size: cover;
}

#challenge .name {
  font-family: "Segoe UI";
  font-weight: 600;
  color: black;
  font-size: 15pt;
  margin: 0;
}

#challenge .type {
  font-weight: 400;
  font-family: "Segoe UI";
  color: black;
  font-size: 11pt;
  margin: 0;
}

#challenge .follow {
  background-color: #a7f6ff;
  border: 2px solid black;
  border-radius: 6px;
  padding: 3px 25px 3px 25px;
  font-weight: 500;
  font-family: "Segoe UI";
  color: black;
  font-size: 12pt;
  margin: 0;
}

#challenge .linha {
  height: 230px;
  border-right: 1px solid #dddddd;
  margin-top: 70px;
}

#challenge .challengeName {
  font-weight: 700;
  font-family: "Segoe UI";
  color: black;
  font-size: 20pt;
}

#challenge .info {
  padding-top: 70px;
}

#challenge .challengeDescript {
  font-weight: 500;
  font-family: "Segoe UI";
  color: black;
  font-size: 12pt;
}

#challenge .btnSubmitStyle {
  background-color: white;
  border: 2px solid black;
  font-weight: 600;
  padding: 3px 10px 3px 10px;
  color: black;
  font-family: "Segoe UI";
  border-radius: 14px;
  font-size: 16px;
}

#challenge .btnSubmitedStyle {
  background-color: #dee5ff;
  border: 2px solid black;
  font-weight: 600;
  padding: 3px 10px 3px 10px;
  color: black;
  font-family: "Segoe UI";
  border-radius: 14px;
  font-size: 16px;
}

@media only screen and (min-width: 1000px) {
  #challenge .cover {
    width: 1000px;
  }

  @media only screen and (min-width: 1400px) {
    #challenge .profile-picture {
      width: 30%;
    }
  }
}
</style>
