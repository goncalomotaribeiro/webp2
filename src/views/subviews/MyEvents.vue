<template>
    <div id="myEvents">
        <b-row columns v-if="getAllMyEvents.length > 0" id="cards">
            <CardEventPanel v-for="myEventPanel in getAllMyEvents" :key="myEventPanel.id" :myEvent="myEventPanel"/>
        </b-row>
        <b-button to="/events" v-else class="info text-left">
            Ainda não guardas-te nenhum evento.
        </b-button>
    </div>
</template>
<script>
import CardEventPanel from '@/components/CardEventPanel.vue'
export default {
    components: {
    CardEventPanel
  },
  computed: {
    getAllMyEvents() {
      return this.$store.getters.getMyEvents
    },
  }
  
}
</script>
<style>
#myEvents .info{
    margin-top: 100px;
    font-weight: 500;
    background-color: white;
    color:rgb(73, 73, 73);
    font-size: 12pt;
    font-family: 'Consolas';
    border: 1px solid rgb(73, 73, 73);
}

#myEvents .info:hover{
    box-shadow:  #ebceff 6px 6px;
}

</style>