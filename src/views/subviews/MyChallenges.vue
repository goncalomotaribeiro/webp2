<template>
  <div id="myChallenges">
    <b-row columns v-if="getAllSubmissions.length > 0" id="cards">
      <CardChallengePanel
        v-for="mySubmission in getAllSubmissions"
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
export default {
  components: {
    CardChallengePanel
  },
  computed: {
    getAllSubmissions() {
      return this.$store.getters.getSubmissions.filter(
        submission => submission.result == ""
      );
    }
  }
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
