<template>
  <div id="submissions-admin">
    <h3>Gestão de Submissões</h3>
    <br /><br />

    <!-- FILTROS DESAFIOS -->
    <b-container id="submissionsTable">
      <b-row class="text-left d-flex align-items-center">
        <b-col cols="3">
          <b-button id="btnAdd" class="mr-3" v-b-modal.modal-1>+</b-button>
          <label for="">Adicionar</label>
        </b-col>
        <b-col>
          <b-row>
            <b-col cols="3" class="ml-4"><label for="">Procurar Id Desafio:</label></b-col>
            <b-col cols="3">
              <b-form-input type="text" placeholder="id" v-model="search">
              </b-form-input>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <br /><br />

      <!-- TABELA SUBMISSIONS -->
      <table class="table table-striped table-bordered" sticky-header>
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Utilizador</th>
            <th scope="col">Desafio</th>
            <th scope="col">Trabalho</th>
            <th scope="col">Resultado</th>
            <th scope="col">Data</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody columns v-if="getAllSubmissions.length  > 0">
          <tr v-for="submission in getAllSubmissions" :key="submission.id">
            <td>{{ submission.id }}</td>
            <td>{{ submission.user }}</td>
            <td>{{ submission.challenge }}</td>
            <td>{{ getDescription(submission.work) }}</td>
            <td>{{ submission.result }}</td>
            <td>{{ submission.date }}</td>
            <td>
              <b-button @click="editOpen" :id="submission.id" variant="info" class="mr-3" v-b-modal.modal-2>Editar</b-button>
              <b-button @click="deleteSubmission" :id="submission.id" variant="danger">Apagar</b-button>
            </td>
          </tr>
        </tbody>
        <p v-else class="info">Não existem Submissões criadas</p>
      </table>

      <!-- FORMULÁRIO CRIAR SUBMISSÃO -->
      <b-modal id="modal-1" title="Criar Submissão" @cancel="clear" @ok="onSubmit" ok-title="Criar">
        <b-row class="justify-content-md-center">
          <b-form>
            <b-form-group
              id="input-group-1"
              label="Utilizador:"
              label-for="input-1">

              <b-form-input
                id="input-1"
                v-model="submission.user"
                type="text"
                required>
              </b-form-input>
            </b-form-group>

             <b-form-group
              id="input-group-1"
              label="Desafio:"
              label-for="input-1">

              <b-form-input
                id="input-1"
                v-model="submission.challenge"
                type="text"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Trabalho:"
              label-for="input-1">

              <b-form-input
                id="input-1"
                v-model="submission.work"
                type="text"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Resultado:"
              label-for="input-1">

              <b-form-input
                id="input-1"
                v-model="submission.result"
                type="text"
                required>
              </b-form-input>
            </b-form-group>
          </b-form>
        </b-row>
      </b-modal>

         <!-- FORMULÁRIO EDITAR SUBMISSÃO -->
      <b-modal id="modal-2" title="Editar Submissão" @ok="editSubmission" ok-title="Editar">
        <b-row class="justify-content-md-center">
          <b-form>
            <b-form-group
              id="input-group-1"
              label="Utilizador:"
              label-for="input-1">

              <b-form-input
                id="input-1"
                v-model="submissionToEdit.user"
                type="text"
                required>
              </b-form-input>
            </b-form-group>

             <b-form-group
              id="input-group-1"
              label="Desafio:"
              label-for="input-1">

              <b-form-input
                id="input-1"
                v-model="submissionToEdit.challenge"
                type="text"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Trabalho:"
              label-for="input-1">

              <b-form-input
                id="input-1"
                v-model="submissionToEdit.work"
                type="text"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Resultado:"
              label-for="input-1">

              <b-form-input
                id="input-1"
                v-model="submissionToEdit.result"
                type="text"
                required>
              </b-form-input>
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
      submission: {
        user: "",
        challenge: "",
        work: "",
        result: ""
      },
      search: "",
      submissionToEdit: {
        user: "",
        challenge: "",
        work: "",
        result: ""
      },
    };
  },
  methods: {
    onSubmit() {
      const submission = {
        id: this.$store.getters.getNextSubmissionId,
        user: this.submission.user,
        challenge: this.submission.challenge,
        work: this.submission.work,
        result: this.submission.result,
        date: new Date().toLocaleString()
      };
        this.$store.dispatch("insertSubmission", submission);
        this.submission.work = "";
      },
    clear(){
      this.submission.user = "";
      this.submission.challenge = "";
      this.submission.work = "";
      this.submission.result = "";
      this.submission.date = "";
    },
    deleteSubmission(event) {
      this.$store.dispatch("deleteSubmission", event.target.id);
    },
    editOpen(event){
      this.submissionToEdit = this.$store.getters.getSubmissionById(event.target.id);
    },
    editSubmission() {
      const newSubmission = {
        id: this.submissionToEdit.id,
        user: this.submissionToEdit.user,
        challenge: this.submissionToEdit.challenge,
        work: this.submissionToEdit.work,
        result: this.submissionToEdit.result,
        date: this.submissionToEdit.date
      };
      this.$store.dispatch("updateSubmission", newSubmission);
    },
    getDescription(desc) {
      return desc.substring(0, 30) + '...';
    }
  },
   computed: {
    getAllSubmissions() {
      return this.$store.getters.getSubmissionsFiltered(1, this.search);
    }
  }
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

#submissions-admin .info{
  color: black;
  font-weight: 500;
  font-size: 12pt;
  font-family: 'Consolas';
  margin-top: 10px;
}

</style>