<template>
  <b-card
    img-src="../assets/plugin.webp"
    img-top
    class="cardChallenge ml-xl-4"
  >
    <b-row>
      <b-col
        cols="0"
        :style="{ 'background-color': event.scientific_area.color }"
        class="category ml-3"
        >{{ event.scientific_area.area }}</b-col
      >
      <b-col
        cols="0"
        class="description d-flex align-self-center ml-4 mr-3"
       >{{` ${event.edition}º Edição`}}
      </b-col>
    </b-row>
    <b-row class="text-left mt-3">
      <b-col
        cols="0"
        class="titleChallenge d-flex align-self-center ml-4 mr-3"
        v-if="event.state.state == 'Próximo'"
        >{{ date }}
      </b-col>
       <b-col
        cols="0"
        class="stateOpen d-flex align-self-center ml-4 mr-3"
        v-if="event.state.state == 'Aberto'  && countdown != 'Fechado'">{{ event.state.state }}
      </b-col>
      <b-col
        cols="0"
        class="stateClose d-flex align-self-center ml-4 mr-3"
        v-if="event.state.state == 'Fechado'">{{ event.state.state }}
      </b-col>
      <b-col>
        <b-row>
          <b-col class="titleChallenge">{{ event.title }}</b-col>
        </b-row>
        <b-row>
          <b-col class="description mt-1 mb-1">{{
            getDescription(event.description)
          }}</b-col>
        </b-row>
      </b-col>
    </b-row>
    <router-link
      :to="{ name: 'Event', params: { eventId: event.id } }"
      class="stretched-link"
    ></router-link>
  </b-card>
</template>

<script>
export default {
  name: "CardEvent",
  props: {
    event: Object,
  },
  data() {
    return {
      countdown: "",
      timeleft: 0,
      date: ""
    }
  },
  methods: {
    getDescription(desc) {
      return desc.substring(0, 40) + "...";
    },
    countDownTimer() {
            setTimeout(() => {
              let today = new Date().getTime();
              let date_en = new Date(this.event.date).getTime();
              
              this.timeleft = date_en - today;

              let days = Math.floor(this.timeleft / (1000 * 60 * 60 * 24));
              let hours = Math.floor((this.timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              let minutes = Math.floor((this.timeleft % (1000 * 60 * 60)) / (1000 * 60));
              let seconds = Math.floor((this.timeleft % (1000 * 60)) / 1000);

              this.countdown = days + "d " + hours + "h " + minutes + "m " + seconds + "s "

              if(days == 0){
                this.countdown = hours + "h " + minutes + "m " + seconds + "s "
              } 
              if(days == 0 && hours == 0){
                  this.countdown = minutes + "m " + seconds + "s "
              }
              if(days == 0 && hours == 0 && minutes == 0){
                  this.countdown = seconds + "s "
              }

              if(this.timeleft < 0 && this.event.state.id == 2 ){
                this.countdown = "Fechado"
                this.event.state.id == 3
                this.handleEditState()
                this.$router.go()
              }
              this.countDownTimer()
            }, 1000)
    },
    async handleEditState() {
      await this.$store.dispatch("editEvent", this.event);
    },
  },
  created () {
    this.countDownTimer()

    const monthNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
      "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
    ];

    this.date = new Date(this.event.date);

    let day = this.date.getDate()

    this.date = day + " " + monthNames[this.date.getMonth()]
  },
};
</script>

<style>
@media only screen and (min-width: 1000px) {
  #nextEvents .cardChallenge {
    margin-bottom: 60px;
    margin-right: 40px;
    width: 28%;
    border-radius: 13px;
    border: 2px solid black;
  }

  #nextEvents .card-img-top {
    opacity: 0.9;
    border-radius: 9px 9px 0px 0px;
    height: 11vw;
    object-fit: cover;
    border-bottom: 2px solid black;
  }
}

#diamond,
#diamondActive {
  width: 15px;
  height: 35px;
}

@media only screen and (max-width: 1000px) {
  #nextEvents .cardChallenge {
    margin-bottom: 60px;
    border-radius: 13px;
    border: 2px solid black;
  }

  #nextEvents .card-img-top {
    opacity: 0.9;
    border-radius: 9px 9px 0px 0px;
    height: 200px;
    object-fit: cover;
    border-bottom: 2px solid black;
  }
}

#nextEvents .btnSubmitStyle {
  font-weight: 600;
  padding: 3px 10px 3px 10px;
  color: black;
  font-family: "Segoe UI";
  border-radius: 14px;
  font-size: 16px;
}

#nextEvents .titleChallenge {
  font-weight: 600;
  color: black;
  font-family: "Segoe UI";
  font-size: 20px;
}

#nextEvents .state {
  font-weight: 600;
  color: #8088ff;
  font-family: "Segoe UI";
  font-size: 18px;
}

#nextEvents .category {
  border: 2px solid black;
  font-weight: 600;
  padding: 1px 10px 1px 10px;
  color: black;
  font-family: "Segoe UI";
  border-radius: 5px;
  font-size: 15px;
}

#nextEvents .time1 {
  font-weight: 400;
  color: black;
  font-family: "Segoe UI";
  font-size: 20px;
}

#nextEvents .time2 {
  color: rgb(138, 138, 138);
  font-family: "Segoe UI";
  font-size: 19px;
}

#nextEvents .description {
  font-weight: 500;
  color: black;
  font-family: "Segoe UI";
  font-size: 17px;
}

#nextEvents .btnMyEvent {
  position: absolute;
  top: 5px;
  width: 15%;
  height: 13%;
  background-color: white;
  border-radius: 60px;
  border: 2px solid black;
  z-index: 2;
}

#nextEvents .btnMyEventActive {
  position: absolute;
  top: 5px;
  width: 15%;
  height: 13%;
  background-color: #fff3c2;
  border-radius: 60px;
  border: 2px solid black;
  z-index: 2;
}
</style>