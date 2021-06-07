<template>
  <div id="openChallenges">
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
              id="searchChallenge"
              class="my-2 my-sm-0"
              type="submit"
            >
              <b-img
                src="../../assets/search.png"
                class="w-75"
                fluid
                alt="Fluid image"
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

      <b-row columns v-if="getAllChallenges.length > 0" id="cards">
        <CardChallenge
          v-for="myChallenge in getAllChallenges"
          :key="myChallenge.id"
          :challenge="myChallenge"
        />
      </b-row>
      <p v-else class="info">Não existem Desafios a apresentar.</p>
    </b-container>
  </div>
</template>

<script>
import CardChallenge from "@/components/CardChallenge.vue";
export default {
  components: {
    CardChallenge
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
    getAllChallenges() {
      return this.$store.getters.getChallengesFiltered(
        1,
        this.filterScientificAreaSelected,
        this.search,
        3
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
  #cardsList {
    width: 1250px;
  }
}

#cards {
  margin-top: 30px;
}

#openChallenges .info {
  color: black;
  font-weight: 500;
  font-size: 15pt;
  font-family: "Consolas";
  margin-top: 100px;
  margin-bottom: 500px;
}
</style>
