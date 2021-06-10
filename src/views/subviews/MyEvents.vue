<template>
  <div id="myEvents">
    <b-row columns v-if="my_events.length > 0" id="cards">
      <CardEventPanel
        v-for="my_event in my_events"
        :key="my_event.id"
        :myEvent="my_event"
      />
    </b-row>
    <b-button to="/events" v-else class="info text-left">
      Ainda não guardas-te nenhum evento.
    </b-button>
  </div>
</template>
<script>
import CardEventPanel from "@/components/CardEventPanel.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    CardEventPanel
  },
  data() {
    return {
      my_events: [],
    };
  },
  methods: {
    //dispatch 'getAllMyEvents' Action to Vuex Store
    async getMyEventsList() {
      this.loading = true;
      try {
        await this.$store.dispatch("getAllMyEvents");
        this.my_events = this.getMyEvents;
        this.my_events = this.my_events.filter((my_event) => my_event.id_user == this.$store.getters.getLoggedUser.id)
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
    ...mapGetters(["getMessage", "getMyEvents", "getMyEvent"]),
  },
  created() {
    this.getMyEventsList();
  },
};
</script>
<style>
#myEvents .info {
  margin-top: 100px;
  font-weight: 500;
  background-color: white;
  color: rgb(73, 73, 73);
  font-size: 12pt;
  font-family: "Consolas";
  border: 1px solid rgb(73, 73, 73);
}

#myEvents .info:hover {
  box-shadow: #ebceff 6px 6px;
}
</style>
