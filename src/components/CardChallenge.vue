<template>
  <b-card
    img-src="../assets/challenge1.jpg"
    img-top
    class="cardChallenge ml-xl-4"
  >
    <b-row>
      <b-col
        cols="0"
        :style="{ 'background-color': challenge.scientific_area.color }"
        class="category ml-3"
        >{{ challenge.scientific_area.area }}</b-col
      >
      <b-col
        cols="0"
        class="titleChallenge d-flex align-self-center ml-4 mr-3"
        v-if="challenge.state.state == 'Aberto'">{{countdown}}
      </b-col>
    </b-row>
    <b-row class="text-left mt-3">
      <b-col
        cols="0"
        class="titleChallenge d-flex align-self-center ml-4 mr-3"
        v-if="challenge.state.state == 'Próximo'"
        >{{ date }}
      </b-col>
       <b-col
        cols="0"
        class="stateOpen d-flex align-self-center ml-4 mr-3"
        v-if="challenge.state.state == 'Aberto'  && countdown != 'Fechado'">{{ challenge.state.state }}
      </b-col>
      <b-col
        cols="0"
        class="stateClose d-flex align-self-center ml-4 mr-3"
        v-if="challenge.state.state == 'Fechado'">{{ challenge.state.state }}
      </b-col>
      <b-col>
        <b-row>
          <b-col class="titleChallenge">{{ challenge.title }}</b-col>
        </b-row>
        <b-row>
          <b-col class="description mt-1 mb-1">{{
            getDescription(challenge.description)
          }}</b-col>
        </b-row>
      </b-col>
    </b-row>
    <router-link
      :to="{ name: 'Challenge', params: { challengeId: challenge.id } }"
      class="stretched-link"
    ></router-link>
  </b-card>
</template>

<script>
export default {
  name: "CardChallenge",
  props: {
    challenge: Object,
  },
  data() {
    return {
      countdown: "",
      timeleft: 0,
      timeleftNextChallenge: 0,
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
              let date_en = new Date(this.challenge.date_end).getTime();
              
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

              if(this.timeleft < 0 && this.challenge.state.id ==1 ){
                this.countdown = "Fechado"
                this.challenge.id_state = 3
                this.handleEditState()
                this.$router.go()
              }
              this.countDownTimer()
            }, 1000)
    },
    countDownTimerNextChallenges() {
            setTimeout(() => {
              let today = new Date().getTime();
              let date_ini = new Date(this.challenge.date_ini).getTime();
              
              this.timeleftNextChallenge = date_ini - today;

              if(this.timeleftNextChallenge < 0 && this.challenge.state.id ==2 ){
                this.challenge.id_state = 1
                this.handleEditState()
                this.$router.go()
              }
              this.countDownTimer()
            }, 1000)
    },
    async handleEditState() {
      await this.$store.dispatch("editChallenge", this.challenge);
    },
  },
  created () {
    if(this.challenge.state.id == 2){
      this.countDownTimerNextChallenges()
    }else{
      this.countDownTimer()
    }
    const monthNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
      "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
    ];

    this.date = new Date(this.challenge.date_ini);

    let day = this.date.getDate()

    this.date = day + " " + monthNames[this.date.getMonth()]
  },
};
</script>

<style>
@media only screen and (min-width: 1000px) {
  #openChallenges .cardChallenge {
    margin-bottom: 60px;
    margin-right: 40px;
    width: 28%;
    border-radius: 13px;
    border: 2px solid black;
  }

  #openChallenges .card-img-top {
    opacity: 0.9;
    border-radius: 9px 9px 0px 0px;
    height: 11vw;
    object-fit: cover;
    border-bottom: 2px solid black;
  }
}

@media only screen and (max-width: 1000px) {
  #openChallenges .cardChallenge {
    margin-bottom: 60px;
    border-radius: 13px;
    border: 2px solid black;
  }

  #openChallenges .card-img-top {
    opacity: 0.9;
    border-radius: 9px 9px 0px 0px;
    height: 200px;
    object-fit: cover;
    border-bottom: 2px solid black;
  }
}

#openChallenges .btnSubmitStyle {
  font-weight: 600;
  padding: 3px 10px 3px 10px;
  color: black;
  font-family: "Segoe UI";
  border-radius: 14px;
  font-size: 16px;
}

#openChallenges .titleChallenge {
  font-weight: 600;
  color: black;
  font-family: "Segoe UI";
  font-size: 20px;
}

#openChallenges .stateOpen {
  font-weight: 600;
  color: #8088ff;
  font-family: "Segoe UI";
  font-size: 18px;
}

#openChallenges .stateClose {
  font-weight: 600;
  color: #df4b31;
  font-family: "Segoe UI";
  font-size: 18px;
}

#openChallenges .category {
  border: 2px solid black;
  font-weight: 600;
  padding: 1px 10px 1px 10px;
  color: black;
  font-family: "Segoe UI";
  border-radius: 5px;
  font-size: 15px;
}

#openChallenges .time1 {
  font-weight: 400;
  color: black;
  font-family: "Segoe UI";
  font-size: 20px;
}

#openChallenges .time2 {
  color: rgb(138, 138, 138);
  font-family: "Segoe UI";
  font-size: 19px;
}

#openChallenges .description {
  font-weight: 500;
  color: black;
  font-family: "Segoe UI";
  font-size: 17px;
}
</style>
