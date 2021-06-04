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
            <b-button
              size="sm"
              id="searchEvent"
              class="my-2 my-sm-0"
              type="submit"
            >
              <b-img
                src="../../assets/search.png"
                class="w-75"
                id="imgSearch"
                alt="icon de pesquisa"
              ></b-img>
            </b-button>

            <b-form-select
              id="filterCategory"
              class="btnMenu2 ml-2"
              v-model="category.selected"
              :options="category.options"
            ></b-form-select>
            <b-form-select
              id="filterScientificArea"
              class="btnMenu2 ml-4"
              v-model="filterScientificAreaSelected"
              :options="getAllScientificAreas"
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
          v-for="myEvent in getAllEvents"
          :key="myEvent.id"
          :event="myEvent"
        />
      </b-row>
      <p v-else class="info">Não existem Eventos a apresentar.</p>
    </b-container>
  </div>
</template>

<script>
import CardEvent from "@/components/CardEvent.vue";
export default {
  components: {
    CardEvent
  },
  data() {
    return {
      category: {
        selected: null,
        options: [
          { value: null, text: "Categoria" },
          { value: "a", text: "This is First option" },
          { value: "b", text: "Selected Option" },
          { value: { C: "3PO" }, text: "This is an option with object value" },
          { value: "d", text: "This one is disabled", disabled: true }
        ]
      },
      filterScientificAreaSelected: "all",
      scientific_area: "",
      search: ""
    };
  },
  computed: {
    getAllEvents() {
      return this.$store.getters.getEventsFiltered(
        1,
        this.filterScientificAreaSelected,
        this.search,
        1
      );
    },
    getAllScientificAreas() {
      return this.$store.getters.getScientificAreasForSelect;
    }
  }
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
