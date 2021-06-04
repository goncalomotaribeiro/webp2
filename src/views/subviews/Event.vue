<template>
  <div id="event">
    <b-container
      fluid
      class="cover"
      :style="{
        backgroundImage: 'url(' + require('../../assets/' + getEvent.img) + ')'
      }"
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
          <p class="name mb-2">Rodrigo Moreira</p>
          <p class="type mb-3">Docente</p>
          <b-button class="follow">Seguir</b-button>
        </b-col>
        <b-col cols="0">
          <div class="linha align-self-center d-none d-xl-block"></div>
        </b-col>
        <b-col cols="7" class="text-left ml-5 info">
          <span class="challengeName">{{ getEvent.title }}</span>
          <span class="name d-flex justify-content-end">{{
            getEvent.date
          }}</span>
          <p class="challengeDescript mt-3">{{ getEvent.description }}</p>

          <span v-if="getEventState.state == 'Próximo'">
            <b-button
              @click="onSubmit"
              id="btnSubmit"
              class="btnSubmitStyle mt-3"
              v-if="saved"
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
              @click="deleteMyEvent"
              id="btnSubmited"
              class="btnSubmitedStyle mt-3"
              v-else
            >
              Guardado
            </b-button>

            <b-button
              :href="getEvent.link"
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
export default {
  name: "Event",
  data() {
    return {};
  },
  methods: {
    onSubmit() {
      const myEvent = {
        id: this.$store.getters.getNextMyEventId,
        event: this.$route.params.eventId,
        user: this.$store.getters.getLoggedUser.id
      };
      this.$store.dispatch("insertMyEvent", myEvent);
    },
    deleteMyEvent() {
      this.$store.dispatch("deleteMyEvent", this.$route.params.eventId);
    }
  },
  computed: {
    getEvent() {
      return this.$store.getters.getEventById(this.$route.params.eventId);
    },
    getEventState() {
      return this.$store.getters.getEventStateById(this.getEvent.state);
    },
    saved() {
      for (const myEvent of this.$store.getters.getMyEvents) {
        if (this.$route.params.eventId == myEvent.event) {
          return false;
        }
      }
      return true;
    }
  }
};
</script>
<style>
#event .cover {
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
