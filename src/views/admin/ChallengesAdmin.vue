<template>
  <div id="challenges-admin">
    <h3>Gestão de Desafios</h3>
    <br /><br />

    <!-- CHALLENGES FILTERS -->
    <b-container id="challengesTable">
      <b-row class="text-left d-flex align-items-center">
        <b-col cols="3">
          <!-- ADD CHALLENGE -->
          <b-button id="btnAdd" class="mr-3" v-b-modal.modal-1 @click="clear()"
            >+</b-button
          >
          <label for="">Adicionar</label>
        </b-col>
        <b-col>
          <!-- SELECT CHALLENGE AREA -->
          <b-row>
            <b-col cols="0"><label for="">Area:</label></b-col>
            <b-col>
              <b-form-select
                id="filterChallengeArea"
                class="btnMenu2 ml-4"
                v-model="filterChallengeAreaSelected"
                :options="optionsAreaChallenge"
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
          <!-- SEARCH CHALLENGE -->
          <b-row>
            <b-col cols="3" class="ml-4"><label for="">Procurar:</label></b-col>
            <b-col>
              <b-form-input type="text" placeholder="titulo" v-model="search">
              </b-form-input>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <br /><br />

      <!-- CHALLENGES TABLE -->
      <table class="table table-striped table-bordered " sticky-header>
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Titulo</th>
            <th scope="col">Descrição</th>
            <th scope="col">Utilizador</th>
            <th scope="col">Area</th>
            <th scope="col">Categoria</th>
            <th scope="col">Estado</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody columns v-if="getAllChallenges.length > 0">
          <tr v-for="(challenge, index) in getAllChallenges" :key="index">
            <td class="align-middle">{{ challenge.id }}</td>
            <td class="align-middle">{{ challenge.title }}</td>
            <td class="align-middle">{{ challenge.description }}</td>
            <td class="align-middle">{{ challenge.user.username }}</td>
            <td class="align-middle">{{ challenge.scientific_area.area }}</td>
            <td class="align-middle">{{ challenge.challenge_category.category }}</td>
            <td class="align-middle">{{ challenge.state.state }}</td>
            <td class="align-middle">
              <b-button
                @click="editOpen"
                :id="challenge.id"
                variant="info"
                class="mb-3"
                v-b-modal.modal-2
                >Editar</b-button
              >
              <b-button
                @click="handleDeleteChallenge"
                :id="challenge.id"
                variant="danger"
                >Apagar</b-button
              >
            </td>
          </tr>
        </tbody>
        <p v-else class="info">Não existem Desafios criados</p>
      </table>

      <!-- FORMULÁRIO CRIAR DESAFIO -->
      <b-modal hide-header hide-footer id="modal-1">
        <label class="label-create mb-5">Criar desafio...</label>
        <b-form
          @submit.prevent="handleCreateChallenge"
          id="formCreateChallenge"
          class="mb-5"
          enctype="multipart/form-data"
        >
          <!--IMG-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Imagem</label>
              <b-form-file
                name="pic"
                id="file-input"
                class="mb-4"
                v-model="challenge.img"
                accept=".jpg, .png"
              ></b-form-file
              ><br />
              <!-- <label class="lblFields" v-if="user.profile_picture">{{user.profile_picture.name}}</label> -->
            </b-col>
          </b-row>

          <!--TITLE-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Titulo</label>
              <b-form-input
                id="txtTitle"
                v-model="challenge.title"
                type="text"
                placeholder="titulo"
                required
              ></b-form-input
              ><br />
            </b-col>

            <!--DESCRIPTION-->
            <b-col>
              <label class="lblFields">Descrição</label>
              <b-form-textarea
                id="textareaDescription"
                v-model="challenge.description"
                size="sm"
                placeholder="descrição"
              ></b-form-textarea
              ><br />
            </b-col>
          </b-row>

          <!--INICIAL DATE-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Data inicial</label>
              <b-form-input
                class="Date"
                id="txtDateIn"
                v-model="challenge.date_ini"
                type="datetime-local"
                placeholder="data inicial"
                :min="minDateIni"
                required
              ></b-form-input
              ><br />
            </b-col>

            <!--FINAL DATE-->
            <b-col>
              <label class="lblFields">Data final</label>
              <b-form-input
                class="Date"
                id="txtDateEnd"
                v-model="challenge.date_end"
                type="datetime-local"
                placeholder="data final"
                :min="minDateEnd"
                required
              ></b-form-input
              ><br />
            </b-col>
          </b-row>

          <!--RULES-->
          <b-row>
            <b-col>
              <label class="lblFields">Regras</label>
              <b-form-textarea
                id="textareaRules"
                v-model="challenge.rules"
                size="sm"
                placeholder="regras"
              ></b-form-textarea
              ><br />
            </b-col>
            <!--SCIENTIFIC AREA-->
            <b-col>
              <label class="lblFields">Area Científica</label>
              <b-form-group>
                <b-form-select
                  id="selectArea"
                  v-model="challenge.id_area"
                  :options="optionsAreaChallenge"
                  size="sm"
                  required
                >
                </b-form-select> </b-form-group
              ><br />
            </b-col>
          </b-row>

          <!--CATEGORY-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Categoria</label>
              <b-form-group>
                <b-form-select
                  id="selectCategory"
                  v-model="challenge.id_category"
                  :options="optionsCategoryChallenge"
                  size="sm"
                  required
                >
                </b-form-select> </b-form-group
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

      <!-- FORMULÁRIO EDITAR DESAFIO -->
      <b-modal hide-header hide-footer id="modal-2">
        <label class="label-create mb-5">Editar desafio...</label>
        <b-form
          @submit.prevent="handleEditChallenge"
          id="formEditChallenge"
          class="mb-5"
          enctype="multipart/form-data"
        >
          <!--IMG-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Imagem</label>
              <b-form-file
                name="pic"
                id="file-input"
                class="mb-4"
               
                accept=".jpg, .png"
              ></b-form-file
              ><br />
              <!-- <label class="lblFields" v-if="user.profile_picture">{{user.profile_picture.name}}</label> -->
            </b-col>
          </b-row>

          <!--TITLE-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Titulo</label>
              <b-form-input
                id="txtTitle"
                v-model="challenge.title"
                type="text"
                placeholder="titulo"
                required
              ></b-form-input
              ><br />
            </b-col>

            <!--DESCRIPTION-->
            <b-col>
              <label class="lblFields">Descrição</label>
              <b-form-textarea
                id="textareaDescription"
                v-model="challenge.description"
                size="sm"
                placeholder="descrição"
              ></b-form-textarea
              ><br />
            </b-col>
          </b-row>

          <!--INICIAL DATE-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Data inicial</label>
              <b-form-input
                class="Date"
                id="txtDateIn"
                v-model="challenge.date_ini"
                type="datetime-local"
                placeholder="data inicial"
                :min="minDateIni"
                required
              ></b-form-input
              ><br />
            </b-col>

            <!--FINAL DATE-->
            <b-col>
              <label class="lblFields">Data final</label>
              <b-form-input
                class="Date"
                id="txtDateEnd"
                v-model="challenge.date_end"
                type="datetime-local"
                placeholder="data final"
                :min="minDateEnd"
                required
              ></b-form-input
              ><br />
            </b-col>
          </b-row>

          <!--RULES-->
          <b-row>
            <b-col>
              <label class="lblFields">Regras</label>
              <b-form-textarea
                id="textareaRules"
                v-model="challenge.rules"
                size="sm"
                placeholder="regras"
              ></b-form-textarea
              ><br />
            </b-col>
            <!--SCIENTIFIC AREA-->
            <b-col>
              <label class="lblFields">Area Científica</label>
              <b-form-group>
                <b-form-select
                  id="selectArea"
                  v-model="challenge.id_area"
                  :options="optionsAreaChallenge"
                  size="sm"
                  required
                >
                </b-form-select> </b-form-group
              ><br />
            </b-col>
          </b-row>

          <!--CATEGORY-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Categoria</label>
              <b-form-group>
                <b-form-select
                  id="selectCategory"
                  v-model="challenge.id_category"
                  :options="optionsCategoryChallenge"
                  size="sm"
                  required
                >
                </b-form-select> </b-form-group
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

class Challenge {
  constructor(
    title,
    description,
    date_ini,
    date_end,
    img,
    rules,
    id_area,
    id_category,
    id_state
  ) {
    this.title = title;
    this.description = description;
    this.date_ini = date_ini;
    this.date_end = date_end;
    this.img = img;
    this.rules = rules;
    this.id_area = id_area;
    this.id_category = id_category;
    this.id_state = id_state;
  }
}

export default {
  data() {
    return {
      optionsAreaChallenge: [
        { value: 1, text: "Multimédia" },
        { value: 2, text: "Web" },
        { value: 3, text: "Design" },
      ],
      optionsCategoryChallenge: [
        { value: 1, text: "Júri" },
        { value: 2, text: "Votação" },
      ],
       optionsState: [
        { value: 1, text: "Aberto" },
        { value: 2, text: "Próximo" },
        { value: 2, text: "Fechado" },
      ],
      challenge: new Challenge(
        null,
        null,
        null,
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
      errors: [],
      filterChallengeAreaSelected: "all",
      search: "",
      challenges: [],
    };
  },
  methods: {
    //dispatch 'getAllChallenges' Action to Vuex Store
    async getChallengesList() {
      this.loading = true;
      try {
        await this.$store.dispatch("getAllChallenges");
        this.challenges = this.getChallenges;
      } catch (error) {
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      } finally {
        this.loading = false;
      }
    },

    //dispatch 'createChallenge' Action to Vuex Store
    async handleCreateChallenge() {
      this.message = "";
      this.loading = true;
      this.successful = false;
      this.errors = [];

      this.getState()

      try {
        await this.$store.dispatch("createChallenge", this.challenge);
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

    //dispatch 'editChallenge' Action to Vuex Store
    async handleEditChallenge() {
      this.message = "";
      this.loading = true;
      this.successful = false;
      this.errors = [];

      this.getState()

      try {
        await this.$store.dispatch("editChallenge", this.challenge);
        console.log("UPDATE OK");
        this.message = this.$store.getters.getMessage;
        this.successful = true;
        this.modal = false;
        this.challenges = this.getChallenges;
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
      this.challenge.title = "";
      this.challenge.description = "";
      this.challenge.date_ini = "";
      this.challenge.date_end = "";
      this.challenge.rules = "";
      this.challenge.id_area = "";
      this.challenge.id_category = "";
      this.challenge.id_state = "";
      this.message = "";
    },

    handleDeleteChallenge(event) {
      if (confirm("Tem a certeza que pretende apagar o desafio?")) {
        this.$store.dispatch("deleteChallenge", event.target.id);
        this.$router.go()
      }
    },
    async editOpen(event) {
      await this.$store.dispatch("getChallengeById", event.target.id);
      this.challenge = this.getChallenge;
      this.message = "";
      this.challenge.date_ini = this.challenge.date_ini.substring(0,this.challenge.date_ini.length-8);
      this.challenge.date_end = this.challenge.date_end.substring(0,this.challenge.date_end.length-8);
    },
    getState() {

      let date = new Date(this.challenge.date_ini)
      let dayForm = date.getUTCDate();
      let monthForm = date.getUTCMinutes();

      let today = new Date();
      let day = today.getUTCDate();
      let month = today.getUTCMinutes();
      
      if (day == dayForm && month == monthForm) {
        this.challenge.id_state = 1
      }else{
        this.challenge.id_state = 2
      }
    },
  },
  computed: {
    ...mapGetters(["getMessage", "getChallenges", "getChallenge"]),

    getAllChallenges() {
      return this.$store.getters.getChallengesFiltered(
        1,
        this.filterChallengeAreaSelected,
        this.search
      );
    },

    minDateIni(){
        let iso = new Date();
        // iso.setHours(iso.getHours() + 1);

        iso = iso.toISOString();
        let minDate = iso.substring(0,iso.length-8);
        return minDate
    },

    minDateEnd(){
        let iso = new Date();
        // iso.setHours(iso.getHours() + 6);

        iso = iso.toISOString();
        let minDate = iso.substring(0,iso.length-8);

        return minDate
    }
  },
  mounted() {
    this.getChallengesList();
  },
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

#challenges-admin .info {
  color: black;
  font-weight: 500;
  font-size: 12pt;
  font-family: "Consolas";
  margin-top: 10px;
}
</style>
