<template>
  <div id="event">
    <b-container
      fluid
      class="cover"
    >
    </b-container>

    <b-container>
      <b-row>
        <b-col cols="4" class="mt-5">
          <b-img
            class="profile-picture mt-3 mb-3"
            src="../../assets/picture-teacher.png"
            fluid
            alt="Fluid image"
          ></b-img>
          <p class="name mb-2">{{ user.name }}</p>
          <p class="type mb-3">Docente</p>
          <b-button class="follow">Seguir</b-button>
        </b-col>
        <b-col cols="0">
          <div class="linha align-self-center d-none d-xl-block"></div>
        </b-col>
        <b-col cols="7" class="text-left ml-5 info">
          <span class="challengeName">{{ event.title }}</span>
          <span class="name d-flex justify-content-end">{{
            date
          }}</span>
          <p class="challengeDescript mt-3">{{ event.description }}</p>

          <span v-if="state.state == 'Próximo'">
            <b-button
              id="btnSubmit"
              class="btnSubmitStyle mt-3"
              @click="handleCreateMyEvent()"
              v-if="isSubmited == 'false'"
            >
              Guardar
              <b-img
                src="../../assets/arrow-right-xs.png"
                fluid
                alt="Fluid image"
                class="ml-5 mb-1"
              ></b-img>
            </b-button>
            <b-button
              id="btnSubmited"
              class="btnSubmitedStyle mt-3"
              @click="handleDeleteMyEvent()"
              v-else
            >
              Guardado
            </b-button>

            <b-button
              :href="event.url"
              target="_blank"
              id="btnSubscribe"
              class="btnSubmitStyle mt-3 ml-4"
            >
              Inscrever
              <b-img
                src="../../assets/arrow-right-xs.png"
                fluid
                alt="Fluid image"
                class="ml-5 mb-1"
              ></b-img>
            </b-button>
          </span>
          <span v-else>Fechado</span>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

class MyEvent {
  constructor(
    id_event
  ) {
    this.id_event = id_event
  }
}

export default {
  name: "Challenge",
 data() {
    return {
      my_event: new MyEvent(
        null
      ),
      event: [],
      state: [],
      user: [],
      date: "",
      successful: false,
      message: "",
      loading: false,
      errors: [],
      isSubmited: ""
    };
  },
  methods: {
   //dispatch 'createSubmission' Action to Vuex Store
    async handleCreateMyEvent() {
      this.message = "";
      this.loading = true;
      this.successful = false;
      this.errors = [];

      this.my_event.id_event = this.$route.params.eventId;
      try {
        await this.$store.dispatch("createMyEvent", this.my_event);
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

    async handleGetEvent() {
      await this.$store.dispatch("getEventById", this.$route.params.eventId);
      this.event = this.getEvent;
      this.state = this.event.state
      this.user = this.event.user
      this.event.date = this.event.date.substring(0,this.event.date.length-8);

      const monthNames = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
      "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
      ];

      this.date = new Date(this.event.date);

      let day = this.date.getDate()
      let hours = this.date.getUTCHours()
      let minutes = this.date.getUTCMinutes()

      if(minutes == 0){minutes=minutes+"0"}

      this.date = day + " " + monthNames[this.date.getMonth()] + " " + hours + ":" + minutes
    },
    async submited() {
      try {
        await this.$store.dispatch("getMyEventByIdEvent",  { id_event: this.$route.params.eventId, id_user: this.$store.getters.getLoggedUser.id});
        this.my_event = this.getMyEvent;
      
        if(this.my_event.my_events.length > 0){
            this.isSubmited = "true";
        }else{
          this.isSubmited = "false";
        }
      } catch (error) {
        
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    },
    clear(){
      this.message = "";
    },
    
    handleDeleteMyEvent() {
      this.$store.dispatch("deleteMyEvent", this.my_event.my_events[0].id);
      this.$router.go()
    }
  },
  computed: {
    ...mapGetters(["getMessage", "getEvents", "getEvent", "getMyEvents", "getMyEvent"]),
  },
  created(){
    this.handleGetEvent();
    this.submited();
  }
};
</script>
<style>
#event .cover {
  background-image: url("../../assets/plugin.webp");
  height: 230px;
  margin-top: 67px;
  border-radius: 15px;
  box-shadow: #ebceff 6px 6px;
  border: 1px solid #ebceff;
  background-position: center;
  background-size: cover;
}

#event .name {
  font-family: "Segoe UI";
  font-weight: 600;
  color: black;
  font-size: 15pt;
  margin: 0;
}

#event .type {
  font-weight: 400;
  font-family: "Segoe UI";
  color: black;
  font-size: 11pt;
  margin: 0;
}

#event .follow {
  background-color: #a7f6ff;
  border: 2px solid black;
  border-radius: 6px;
  padding: 3px 25px 3px 25px;
  font-weight: 500;
  font-family: "Segoe UI";
  color: black;
  font-size: 12pt;
  margin: 0;
}

#event .linha {
  height: 230px;
  border-right: 1px solid #dddddd;
  margin-top: 70px;
}

#event .challengeName {
  font-weight: 700;
  font-family: "Segoe UI";
  color: black;
  font-size: 20pt;
}

#event .info {
  padding-top: 70px;
}

#event .challengeDescript {
  font-weight: 500;
  font-family: "Segoe UI";
  color: black;
  font-size: 12pt;
}

#event .btnSubmitStyle {
  background-color: white;
  border: 2px solid black;
  font-weight: 600;
  padding: 3px 10px 3px 10px;
  color: black;
  font-family: "Segoe UI";
  border-radius: 14px;
  font-size: 16px;
}

#event .btnSubmitedStyle {
  background-color: #dee5ff;
  border: 2px solid black;
  font-weight: 600;
  padding: 3px 10px 3px 10px;
  color: black;
  font-family: "Segoe UI";
  border-radius: 14px;
  font-size: 16px;
}

@media only screen and (min-width: 1000px) {
  #event .cover {
    width: 1000px;
  }

  @media only screen and (min-width: 1400px) {
    #event .profile-picture {
      width: 30%;
    }
  }
}
</style>
