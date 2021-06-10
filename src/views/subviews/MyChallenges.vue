<template>
  <div id="myChallenges">
    <b-row columns v-if="submissions.length > 0" id="cards">
      <CardChallengePanel
        v-for="mySubmission in submissions"
        :key="mySubmission.id"
        :submission="mySubmission"
      />
    </b-row>
    <b-button to="/challenges" v-else class="info text-left">
      Ainda não estás a participar em desafios.
    </b-button>
  </div>
</template>
<script>
import CardChallengePanel from "@/components/CardChallengePanel.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    CardChallengePanel,
  },
  data() {
    return {
      submissions: [],
    };
  },
  methods: {
     //dispatch 'getAllSubmissions' Action to Vuex Store
    async getSubmissionsList() {
      this.loading = true;
      try {
        await this.$store.dispatch("getSubmissionsByIdUser",this.$store.getters.getLoggedUser.id);
        this.submissions = this.getSubmissions;
        this.submissions = this.submissions.filter((submission) => submission.classification == null)
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
    ...mapGetters(["getMessage", "getSubmissions", "getSubmission"]),
  },
  created() {
    this.getSubmissionsList();
    let nav = JSON.parse(localStorage.getItem("nav"));
    if (nav != null) {
      localStorage.removeItem("nav");
       this.$router.go()
    }
  },
};
</script>
<style>
#myChallenges .info {
  margin-top: 100px;
  font-weight: 500;
  background-color: white;
  color: rgb(73, 73, 73);
  font-size: 12pt;
  font-family: "Consolas";
  border: 1px solid rgb(73, 73, 73);
}

#myChallenges .info:hover {
  box-shadow: #ebceff 6px 6px;
}
</style>
