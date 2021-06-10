<template>
  <div id="nextEvents">
    <b-container id="cardsList" fluid>
      <b-row class="mr-4 mb-5">
        <b-col sm class="d-flex justify-content-end mt-4">
          <b-nav-form>
            <b-form-input
              v-model="search"
              size="sm"
              class="mr-sm-2 txtSearch"
              placeholder="Pesquisa..."
            ></b-form-input>

            <b-form-select
              id="filterCategory"
              class="btnMenu2 ml-0 ml-xl-4"
              v-model="filterCategorySelected"
              :options="optionsCategoryEvent"
              size="sm"
            >
              <template #first>
                <b-form-select-option value="all"
                  >Categoria</b-form-select-option
                >
              </template>
            </b-form-select>

            <b-form-select
              id="filterScientificArea"
              class="btnMenu2 ml-0 ml-xl-4"
              v-model="filterScientificAreaSelected"
              :options="optionsAreaEvent"
              size="sm"
            >
              <template #first>
                <b-form-select-option value="all"
                  >Area Cientifica</b-form-select-option
                >
              </template>
            </b-form-select>
          </b-nav-form>
        </b-col>
      </b-row>

      <b-row columns v-if="getAllEvents.length > 0" id="cards">
        <CardEvent
          v-for="event in getAllEvents"
          :key="event.id"
          :event="event"
        />
      </b-row>
      <p v-else class="info">Não existem Eventos a apresentar.</p>
    </b-container>
  </div>
</template>

<script>
import CardEvent from "@/components/CardEvent.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    CardEvent
  },
  data() {
    return {
      filterCategorySelected: 'all',
      optionsCategoryEvent: [
        { value: 1, text: "Evento" },
        { value: 2, text: "Competição" },
        { value: 3, text: "Workshop" },
        { value: 4, text: "Palestra" },
      ],
      optionsAreaEvent: [
        { value: 1, text: "Multimédia" },
        { value: 2, text: "Web" },
        { value: 3, text: "Design" },
      ],
      filterScientificAreaSelected: "all",
      scientific_area: "",
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
  },
  computed: {
    ...mapGetters(["getMessage", "getEvents", "getEvent"]),
    
    getAllEvents() {
      return this.$store.getters.getEventsFiltered(
        1,
        this.filterScientificAreaSelected,
        this.search,
        2,
        this.filterCategorySelected,
      );
    }
  },
  mounted() {
    this.getEventsList();
  },
};
</script>

<style>
@media only screen and (min-width: 1000px) {
  #nextEvents #cardsList {
    width: 1250px;
  }
}

#nextEvents #cards {
  margin-top: 30px;
}

#nextEvents .info {
  color: black;
  font-weight: 500;
  font-size: 15pt;
  font-family: "Consolas";
  margin-top: 100px;
  margin-bottom: 500px;
}

#imgSearch {
  width: 15px;
  height: 15px;
}

#nextEvents #searchEvent {
  background-color: white;
  border: 0;
}
</style>
