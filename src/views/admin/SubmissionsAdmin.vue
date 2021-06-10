<template>
  <div id="submissions-admin">
    <h3>Gestão de Submissões</h3>
    <br /><br />

    <!-- SUBMISSIONS FILTERS -->
    <b-container id="submissionsTable">
      <b-row class="text-left d-flex align-items-center">
        <b-col>
          <b-row>
            <b-col cols="2"
              ><label for="">Procurar Id Desafio:</label></b-col
            >
            <b-col cols="3">
              <b-form-input type="number" placeholder="id_desafio" v-model="search">
              </b-form-input>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <br /><br />


      <!-- SUBMISSIONS TABLE -->
      <table class="table table-striped table-bordered" sticky-header>
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Url</th>
            <th scope="col" >Data</th>
            <th scope="col">Classificação</th>
            <th scope="col">Utilizador</th>
            <th scope="col">Desafio</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody columns v-if="getAllSubmissions.length > 0">
          <tr v-for="(submission, index) in getAllSubmissions" :key="index">
            <td class="align-middle">{{ submission.id }}</td>
            <td class="align-middle">{{ submission.url }}</td>
            <td class="align-middle">{{ submission.date }}</td>
            <td class="align-middle">{{ submission.classification }}</td>
            <td class="align-middle">{{ submission.user.username }}</td>
            <td class="align-middle">{{ submission.challenge.title }}</td>
            <td class="align-middle">
              <b-button
                @click="editOpen"
                :id="submission.id"
                variant="info"
                class="mb-3"
                v-b-modal.modal-2
                >Editar</b-button
              >
              <b-button
                @click="handleDeleteSubmission"
                :id="submission.id"
                variant="danger"
                >Apagar</b-button
              >
            </td>
          </tr>
        </tbody>
        <p v-else class="info">Não existem Submissões criadas</p>
      </table>

      <!-- EDIT SUBMISSIONS -->
      <b-modal hide-header hide-footer id="modal-2">
        <label class="label-create mb-5">Editar submissão...</label>
        <b-form
          @submit.prevent="handleEditSubmission"
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

            <!--DATE-->
            <b-col>
              <label class="lblFields">Data</label>
              <b-form-input
                class="Date"
                id="txtDate"
                v-model="submission.date"
                type="datetime-local"
                placeholder="data"
                :min="minDate"
                required
              ></b-form-input
              ><br />
            </b-col>
          </b-row>

          <!--CLASSIFICATION-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Classificação</label>
              <b-form-input
                id="txtClassification"
                v-model="submission.classification"
                type="number"
                placeholder="classificação"
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
            <span>Editar</span> </b-button
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
    classification
  ) {
    this.url = url;
    this.date = date;
    this.classification = classification;
  }
}

export default {
  data() {
    return {
      submission: new Submission(
        null,
        null,
        null
      ),
      successful: false,
      message: "",
      loading: false,
      errors: [],
      search: "",
      submissions: [],
      challenge: {
        id: null,
        id_state: null
      }
    };
  },
  methods: {
    //dispatch 'getAllSubmissions' Action to Vuex Store
    async getSubmissionsList() {
      this.loading = true;
      try {
        await this.$store.dispatch("getAllSubmissions");
        this.submissions = this.getSubmissions;
      } catch (error) {
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      } finally {
        this.loading = false;
      }
    },

    //dispatch 'createSubmission' Action to Vuex Store
    async handleCreateSubmission() {
      this.message = "";
      this.loading = true;
      this.successful = false;
      this.errors = [];

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
      }
    },

    //dispatch 'editSubmission' Action to Vuex Store
    async handleEditSubmission() {
      this.message = "";
      this.loading = true;
      this.successful = false;
      this.errors = [];

      try {
        if(this.submission.classification != ""){
          this.challenge.id = this.submission.challenge.id
          this.challenge.id_state = 3
          await this.$store.dispatch("editChallenge", this.challenge);
        }
        await this.$store.dispatch("editSubmission", this.submission);
        console.log("UPDATE OK");
        this.message = this.$store.getters.getMessage;
        this.successful = true;
        this.modal = false;
        this.submissions = this.getSubmissions;
    
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
      this.submission.url = "";
      this.submission.date = "";
      this.submission.classification = "";
      this.message = "";
    },

    handleDeleteSubmission(submission) {
      if (confirm("Tem a certeza que pretende apagar o submissão?")) {
        this.$store.dispatch("deleteSubmission", submission.target.id);
        this.$router.go()
      }
    },
    async editOpen(event) {
      await this.$store.dispatch("getSubmissionById", event.target.id);
      this.submission = this.getSubmission;
      this.message = "";
      this.submission.date = this.submission.date.substring(0,this.submission.date.length-8);
    },
  },
  computed: {
    ...mapGetters(["getMessage", "getSubmissions", "getSubmission"]),

    getAllSubmissions() {
      return this.$store.getters.getSubmissionsFiltered(
        1,
        this.search
      );
    },

    minDate(){
        let iso = new Date();

        iso = iso.toISOString();
        let minDate = iso.substring(0,iso.length-8);
        return minDate
    }
  },
  mounted() {
    this.getSubmissionsList();
  },
};
</script>
<style>
#submissions-admin {
  margin-top: 130px;
  margin-bottom: 385px;
}

#submissions-admin #btnAdd {
  padding: 0px 10px 0px 10px;
  font-weight: 600;
  font-size: 20px;
  color: black;
  border: 2px solid;
  background-color: #ebceff;
  border-radius: 20px;
}

#submissions-admin .modal-lg {
  max-width: 5px !important;
}

#submissions-admin .info {
  color: black;
  font-weight: 500;
  font-size: 12pt;
  font-family: "Consolas";
  margin-top: 10px;
}
</style>
