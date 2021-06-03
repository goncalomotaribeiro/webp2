<template>
  <div id="challenges-admin">
    <h3>Gestão de Desafios</h3>
    <br /><br />

    <!-- FILTROS DESAFIOS -->
    <b-container id="challengesTable">
      <b-row class="text-left d-flex align-items-center">
        <b-col cols="3">
          <b-button id="btnAdd" class="mr-3" v-b-modal.modal-1>+</b-button>
          <label for="">Adicionar</label>
        </b-col>
        <b-col>
          <b-row>
            <b-col cols="0"><label for="">Area Cientifica:</label></b-col>
            <b-col>
              <b-form-select id="filterScientificArea" class="btnMenu2 ml-4" 
                  v-model="filterScientificAreaSelected"
                  :options="getAllScientificAreas"
                  size="sm">
                    <template #first>
                    <b-form-select-option value="all">Todas</b-form-select-option>
                    </template>
              </b-form-select>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col cols="3" class="ml-4"><label for="">Procurar:</label></b-col>
            <b-col>
              <b-form-input type="text" placeholder="Nome" v-model="search">
              </b-form-input>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <br /><br />

      <!-- TABELA DESAFIOS -->
      <table class="table table-striped table-bordered" sticky-header>
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Titulo</th>
            <th scope="col">Descrição</th>
            <th scope="col">Area Cientifica</th>
            <th scope="col">Estado</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody columns v-if="getAllChallenges.length  > 0">
          <tr v-for="challenge in getAllChallenges" :key="challenge.id">
            <td>{{ challenge.id }}</td>
            <td>{{ challenge.title }}</td>
            <td>{{ getDescription(challenge.description) }}</td>
            <td>{{ challenge.scientific_area }}</td>
            <td>{{ challenge.state }}</td>
            <td>
              <b-button @click="editOpen" :id="challenge.id" variant="info" class="mr-3" v-b-modal.modal-2>Editar</b-button>
              <b-button @click="deleteChallenge" :id="challenge.id" variant="danger">Apagar</b-button>
            </td>
          </tr>
        </tbody>
        <p v-else class="info">Não existem Desafios criados</p>
      </table>

      <!-- FORMULÁRIO CRIAR DESAFIO -->
      <b-modal id="modal-1" title="Criar Desafio" @cancel="clear" @ok="onSubmit" ok-title="Criar">
        <b-row class="justify-content-md-center">
          <b-form>
            <b-form-group
              id="input-group-1"
              label="Nome do Desafio:"
              label-for="input-1">

              <b-form-input
                id="input-1"
                v-model="challenge.title"
                type="text"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Descrição do desafio:"
              label-align-sm="left"
              label-for="txtYear">

              <b-form-textarea
                id="textarea"
                v-model="challenge.description"
                placeholder="Descreva um pouco o desafio..."
                rows="3"
                max-rows="6" required>
              </b-form-textarea>
            </b-form-group>

            <b-form-group
              label="Imagem:"
              label-align-sm="left"
              label-for="txtImg">

              <b-form-input
                id="txtImg"
                type="url"
                v-model="challenge.img" required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Area Cientifica:"
              label-align-sm="left"
              label-for="txtImg">
                <b-form-select id="filterScientificArea" 
                v-model="challenge.scientific_area"
                :options="getAllScientificAreas"
                size="sm" required>
                </b-form-select>
            </b-form-group>

            <b-form-group
              label="Estado:"
              label-align-sm="left"
              label-for="txtImg">
                <b-form-select id="filterChallengeState" 
                v-model="challenge.state"
                :options="getAllChallengeStates"
                size="sm" required>
                </b-form-select>
            </b-form-group>
          </b-form>
        </b-row>
      </b-modal>

         <!-- FORMULÁRIO EDITAR DESAFIO -->
      <b-modal id="modal-2" title="Editar Desafio" @ok="editChallenge" ok-title="Editar">
        <b-row class="justify-content-md-center">
          <b-form>
            <b-form-group
              id="input-group-2"
              label="Nome do Desafio:"
              label-for="input-2">

              <b-form-input
                id="input-2"
                v-model="challengeToEdit.title"
                type="text"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Descrição do desafio:"
              label-align-sm="left"
              label-for="textarea2">

              <b-form-textarea
                id="textarea2"
                v-model="challengeToEdit.description"
                placeholder="Descreva um pouco o desafio..."
                rows="3"
                max-rows="6" required>
              </b-form-textarea>
            </b-form-group>

            <b-form-group
              label="Imagem:"
              label-align-sm="left"
              label-for="txtImg2">

              <b-form-input
                id="txtImg2"
                type="url"
                v-model="challengeToEdit.img" required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Area Cientifica:"
              label-align-sm="left"
              label-for="filterScientificArea2">
                <b-form-select id="filterScientificArea2" 
                v-model="challengeToEdit.scientific_area"
                :options="getAllScientificAreas"
                size="sm" required>
                </b-form-select>
            </b-form-group>

            <b-form-group
              label="Estado:"
              label-align-sm="left"
              label-for="txtImg">
                <b-form-select id="filterChallengeState" 
                v-model="challengeToEdit.state"
                :options="getAllChallengeStates"
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
      challenge: {
        title: "",
        description: "",
        img: "",
        scientific_area: "",
        state: ""
      },
      filterScientificAreaSelected: "all",
      search: "",
      challengeToEdit: {
        title: "",
        description: "",
        img: "",
        scientific_area: "",
        state: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.clear();
      const challenge = {
        id: this.$store.getters.getNextChallengeId,
        title: this.challenge.title,
        description: this.challenge.description,
        img: this.challenge.img,
        scientific_area: this.challenge.scientific_area,
        state: this.challenge.state
      };
      this.$store.dispatch("insertChallenge", challenge);
      this.clear();
    },
    clear(){
      this.challenge.title = "";
      this.challenge.description = "";
      this.challenge.img = "";
      this.challenge.scientific_area = "";
      this.challenge.state = "";
    },
    deleteChallenge(event) {
      this.$store.dispatch("deleteChallenge", event.target.id);
    },
    editOpen(event){
      this.challengeToEdit = this.$store.getters.getChallengeById(event.target.id);
    },
    editChallenge() {
      const newChallenge = {
        id: this.challengeToEdit.id,
        title: this.challengeToEdit.title,
        description: this.challengeToEdit.description,
        img: this.challengeToEdit.img,
        scientific_area: this.challengeToEdit.scientific_area,
        state: this.challengeToEdit.state
      };
      this.$store.dispatch("updateChallenge", newChallenge);
    },
    getDescription(desc) {
      return desc.substring(0, 30) + '...';
    }
  },
   computed: {
    getAllChallenges() {
      return this.$store.getters.getChallengesFiltered(1,
        this.filterScientificAreaSelected, this.search, 0);
    },
    getAllScientificAreas() {
      return this.$store.getters.getScientificAreasForSelect;
    },
    getAllChallengeStates() {
      return this.$store.getters.getChallengeStatesForSelect;
    },
  }
};
</script>
<style>
#challenges-admin {
  margin-top: 130px;
  margin-bottom: 385px;
}

#challenges-admin #btnAdd {
  padding: 0px 10px 0px 10px;
  font-weight: 600;
  font-size: 20px;
  color: black;
  border: 2px solid;
  background-color: #ebceff;
  border-radius: 20px;
}

#challenges-admin .modal-lg {
    max-width: 5px !important;
}

#challenges-admin .info{
  color: black;
  font-weight: 500;
  font-size: 12pt;
  font-family: 'Consolas';
  margin-top: 10px;
}

</style>