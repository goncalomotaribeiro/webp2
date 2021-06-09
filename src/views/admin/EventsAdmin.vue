<template>
  <div id="events-admin">
    <h3>Gestão de Eventos</h3>
    <br /><br />

    <!-- EVENTS FILTERS -->
    <b-container id="eventsTable">
      <b-row class="text-left d-flex align-items-center">
        <b-col cols="3">
          <!-- ADD EVENT -->
          <b-button id="btnAdd" class="mr-3" v-b-modal.modal-1 @click="clear()"
            >+</b-button
          >
          <label for="">Adicionar</label>
        </b-col>
        <b-col>
          <!-- SELECT EVENT AREA -->
          <b-row>
            <b-col cols="0"><label for="">Area:</label></b-col>
            <b-col>
              <b-form-select
                id="filterEventArea"
                class="btnMenu2 ml-4"
                v-model="filterEventAreaSelected"
                :options="optionsAreaEvent"
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
          <!-- SEARCH EVENT -->
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

      <!-- EVENTS TABLE -->
      <table class="table table-striped table-bordered" sticky-header>
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Titulo</th>
            <th scope="col" >Descrição</th>
            <th scope="col">Utilizador</th>
            <th scope="col">Area</th>
            <th scope="col">Categoria</th>
            <th scope="col">Estado</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody columns v-if="getAllEvents.length > 0">
          <tr v-for="(event, index) in getAllEvents" :key="index">
            <td class="align-middle">{{ event.id }}</td>
            <td class="align-middle">{{ event.title }}</td>
            <td class="align-middle">{{ event.description }}</td>
            <td class="align-middle">{{ event.user.username }}</td>
            <td class="align-middle">{{ event.scientific_area.area }}</td>
            <td class="align-middle">{{ event.event_category.category }}</td>
            <td class="align-middle">{{ event.state.state }}</td>
            <td class="align-middle">
              <b-button
                @click="editOpen"
                :id="event.id"
                variant="info"
                class="mb-3"
                v-b-modal.modal-2
                >Editar</b-button
              >
              <b-button
                @click="handleDeleteEvent"
                :id="event.id"
                variant="danger"
                >Apagar</b-button
              >
            </td>
          </tr>
        </tbody>
        <p v-else class="info">Não existem Eventos criados</p>
      </table>

      <!-- FORMULÁRIO CRIAR EVENTO -->
      <b-modal hide-header hide-footer id="modal-1">
        <label class="label-create mb-5">Criar evento...</label>
        <b-form
          @submit.prevent="handleCreateEvent"
          id="formCreateEvent"
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
                v-model="event.img"
                accept=".jpg, .png"
              ></b-form-file
              ><br />
            </b-col>
          </b-row>

          <!--TITLE-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Titulo</label>
              <b-form-input
                id="txtTitle"
                v-model="event.title"
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
                v-model="event.description"
                size="sm"
                placeholder="descrição"
              ></b-form-textarea
              ><br />
            </b-col>
          </b-row>

          <!--EDITION-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Edição</label>
              <b-form-input
                id="txtEdition"
                v-model="event.edition"
                type="text"
                placeholder="edição"
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
                v-model="event.date"
                type="datetime-local"
                placeholder="data"
                :min="minDate"
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
                v-model="event.url"
                type="text"
                placeholder="url"
                required
              ></b-form-input
              ><br />
            </b-col>
            <!--SCIENTIFIC AREA-->
            <b-col>
              <label class="lblFields">Area Científica</label>
              <b-form-group>
                <b-form-select
                  id="selectArea"
                  v-model="event.id_area"
                  :options="optionsAreaEvent"
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
                  v-model="event.id_category"
                  :options="optionsCategoryEvent"
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

      <!-- FORMULÁRIO EDITAR EVENTO -->
      <b-modal hide-header hide-footer id="modal-2">
        <label class="label-create mb-5">Editar evento...</label>
        <b-form
          @submit.prevent="handleEditEvent"
          id="formEditEvent"
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
            </b-col>
          </b-row>

          <!--TITLE-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Titulo</label>
              <b-form-input
                id="txtTitle"
                v-model="event.title"
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
                v-model="event.description"
                size="sm"
                placeholder="descrição"
              ></b-form-textarea
              ><br />
            </b-col>
          </b-row>

          <!--EDITION-->
          <b-row>
            <b-col sm>
              <label class="lblFields">Edição</label>
              <b-form-input
                id="txtEdition"
                v-model="event.edition"
                type="text"
                placeholder="edição"
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
                v-model="event.date"
                type="datetime-local"
                placeholder="data"
                :min="minDate"
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
                v-model="event.url"
                type="text"
                placeholder="url"
                required
              ></b-form-input
              ><br />
            </b-col>
            <!--SCIENTIFIC AREA-->
            <b-col>
              <label class="lblFields">Area Científica</label>
              <b-form-group>
                <b-form-select
                  id="selectArea"
                  v-model="event.id_area"
                  :options="optionsAreaEvent"
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
                  v-model="event.id_category"
                  :options="optionsCategoryEvent"
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

class Event {
  constructor(
    title,
    description,
    edition,
    date,
    img,
    url,
    id_area,
    id_category,
    id_state
  ) {
    this.title = title;
    this.description = description;
    this.edition = edition;
    this.date = date;
    this.img = img;
    this.url = url;
    this.id_area = id_area;
    this.id_category = id_category;
    this.id_state = id_state;
  }
}

export default {
  data() {
    return {
      optionsAreaEvent: [
        { value: 1, text: "Multimédia" },
        { value: 2, text: "Web" },
        { value: 3, text: "Design" },
      ],
      optionsCategoryEvent: [
        { value: 1, text: "Evento" },
        { value: 2, text: "Competição" },
        { value: 3, text: "Workshop" },
        { value: 4, text: "Palestra" },
      ],
       optionsState: [
        { value: 1, text: "Aberto" },
        { value: 2, text: "Próximo" },
        { value: 2, text: "Fechado" },
      ],
      event: new Event(
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
      filterEventAreaSelected: "all",
      search: "",
      events: [],
    };
  },
  methods: {
    //dispatch 'getAllEvents' Action to Vuex Store
    async getEventsList() {
      this.loading = true;
      try {
        await this.$store.dispatch("getAllEvents");
        this.events = this.getEvents;
      } catch (error) {
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      } finally {
        this.loading = false;
      }
    },

    //dispatch 'createEvent' Action to Vuex Store
    async handleCreateEvent() {
      this.message = "";
      this.loading = true;
      this.successful = false;
      this.errors = [];

      this.event.id_state = 1

      try {
        await this.$store.dispatch("createEvent", this.event);
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

    //dispatch 'editEvent' Action to Vuex Store
    async handleEditEvent() {
      this.message = "";
      this.loading = true;
      this.successful = false;
      this.errors = [];

      try {
        await this.$store.dispatch("editEvent", this.event);
        console.log("UPDATE OK");
        this.message = this.$store.getters.getMessage;
        this.successful = true;
        this.modal = false;
        this.events = this.getEvents;
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
      this.event.title = "";
      this.event.description = "";
      this.event.edition = "";
      this.event.date = "";
      this.event.url = "";
      this.event.id_area = "";
      this.event.id_category = "";
      this.event.id_state = "";
      this.message = "";
    },

    handleDeleteEvent(event) {
      if (confirm("Tem a certeza que pretende apagar o evento?")) {
        this.$store.dispatch("deleteEvent", event.target.id);
        this.$router.go()
      }
    },
    async editOpen(event) {
      await this.$store.dispatch("getEventById", event.target.id);
      this.event = this.getEvent;
      this.message = "";
      this.event.date = this.event.date.substring(0,this.event.date.length-8);
    },
  },
  computed: {
    ...mapGetters(["getMessage", "getEvents", "getEvent"]),

    getAllEvents() {
      return this.$store.getters.getEventsFiltered(
        1,
        this.filterEventAreaSelected,
        this.search
      );
    },

    minDate(){
        let iso = new Date();
        // iso.setHours(iso.getHours() + 1);

        iso = iso.toISOString();
        let minDate = iso.substring(0,iso.length-8);
        return minDate
    }
  },
  mounted() {
    this.getEventsList();
  },
};
</script>
<style>
#events-admin {
  margin-top: 130px;
  margin-bottom: 385px;
}

#events-admin #btnAdd {
  padding: 0px 10px 0px 10px;
  font-weight: 600;
  font-size: 20px;
  color: black;
  border: 2px solid;
  background-color: #ebceff;
  border-radius: 20px;
}

#events-admin .modal-lg {
  max-width: 5px !important;
}

#events-admin .info {
  color: black;
  font-weight: 500;
  font-size: 12pt;
  font-family: "Consolas";
  margin-top: 10px;
}
</style>
