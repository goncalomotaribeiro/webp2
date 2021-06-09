<template>
  <div id="openChallenges">
    <b-container id="cardsList" fluid>
      <b-row class="mr-4 mb-5">
        <b-col sm class="d-flex justify-content-end mt-4">
          <b-nav-form>
            <b-form-input
              v-model="search"
              size="sm"
              class="mr-sm-2 txtSearch mb-4 mb-xl-0"
              placeholder="Pesquisa..."
            ></b-form-input>

            <b-form-select
              id="filterCategory"
              class="btnMenu2 ml-0 ml-xl-4"
              v-model="filterCategorySelected"
              :options="optionsCategoryChallenge"
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
              class="btnMenu2 ml-4"
              v-model="filterScientificAreaSelected"
              :options="optionsAreaChallenge"
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
          v-for="challenge in getAllChallenges"
          :key="challenge.id"
          :challenge="challenge"
        />
      </b-row>
      <p v-else class="info">Não existem Desafios a apresentar.</p>
    </b-container>
  </div>
</template>

<script>
import CardChallenge from "@/components/CardChallenge.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    CardChallenge
  },
  data() {
    return {
      filterCategorySelected: 'all',
      optionsCategoryChallenge: [
        { value: 1, text: "Júri" },
        { value: 2, text: "Votação" },
      ],
      optionsAreaChallenge: [
        { value: 1, text: "Multimédia" },
        { value: 2, text: "Web" },
        { value: 3, text: "Design" },
      ],
      filterScientificAreaSelected: "all",
      scientific_area: "",
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
  },
  computed: {
    ...mapGetters(["getMessage", "getChallenges", "getChallenge"]),
    
    getAllChallenges() {
      return this.$store.getters.getChallengesFiltered(
        1,
        this.filterScientificAreaSelected,
        this.search,
        1,
        this.filterCategorySelected,
      );
    }
  },
  mounted() {
    this.getChallengesList();
  },
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
