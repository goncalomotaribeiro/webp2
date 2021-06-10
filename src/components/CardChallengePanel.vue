<template>
  <b-link :to="{ name: 'Challenge', params: { challengeId: challenge.id } }">
    <b-row class="cardChallenge mt-5">
      <b-col cols="lg-2" class="text-xl-left">
        <b-img
          src="../assets/challenge1.jpg"
          alt="Fluid image"
          class="imgUserChallenge"
        ></b-img>
      </b-col>
      <b-col
        cols="0"
        class="d-flex flex-column justify-content-between text-xl-left"
      >
        <b-row>
          <b-col class="titleChallenge">{{ challenge.title }}</b-col>
        </b-row>
        <b-row>
          <b-col class="state mb-2">{{ state.state }}</b-col>
        </b-row>
        <b-row>
          <b-col
            cols="0"
            :style="{ 'background-color':  scientific_area.color }"
            class="category ml-3"
            >{{  scientific_area.area }}</b-col
          >
        </b-row>
      </b-col>
      <div
        class="linha align-self-center d-none d-xl-block"
        style="margin-left:90px"
      ></div>
      <b-col
        cols="0"
        class="d-flex flex-column justify-content-around ml-5 mt-2 mb-2"
      >
        <b-row>
          <b-col class="time1">{{countdown}}</b-col>
        </b-row>
        <b-row>
          <b-col class="time2">Tempo</b-col>
        </b-row>
      </b-col>
      <div class="linha align-self-center ml-5 d-none d-xl-block"></div>
      <b-col class="align-self-center text-xl-left ml-5">
        <b-row>
          <b-col class="description">{{
            getDescription(challenge.description)
          }}</b-col>
        </b-row>
      </b-col>
      <b-col sm class="p-0 align-self-center">
        <b-row>
          <b-col>
            <b-button
              id="btnSubmit"
              class="btnSubmitStyle"
              to="/panel/my-challenges"
            >
              Submetido
            </b-button>
          </b-col>
        </b-row>
        <router-link
          :to="{ name: 'Challenge', params: { challengeId: challenge.id } }"
          class="stretched-link"
        ></router-link>
      </b-col>
    </b-row>
  </b-link>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CardChallengePanel",
  props: {
    submission: Object
  },
  data() {
    return {
      challenge: [],
      state: [],
      scientific_area: [],
      countdown: ""
    };
  },
  computed: {
    ...mapGetters(["getMessage", "getChallenge"]),
  },
  created(){
    this.handleGetChallenge();
    this.countDownTimer()
  },
  methods: {
    getDescription(desc) {
      return desc.substring(0, 40) + "...";
    },

    async handleGetChallenge() {
      await this.$store.dispatch("getChallengeById", this.submission.id_challenge);
      this.challenge = this.getChallenge;
      this.state = this.challenge.state
      this.scientific_area = this.challenge.scientific_area 
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
  }
};
</script>

<style>
@media only screen and (min-width: 1100px) {
  #myChallenges .cardChallenge {
    width: 1210px;
  }
}

@media only screen and (max-width: 700px) {
  #myChallenges .cardChallenge {
    width: 498px;
  }
}

#myChallenges .cardChallenge {
  padding: 20px 20px 20px 20px;
  border-radius: 13px;
  border: 1px solid #dddddd;
}
#myChallenges .imgUserChallenge {
  border-radius: 6px;
  width: 140px;
  height: 116px;
  object-fit: cover;
}
#myChallenges .linha {
  height: 90px;
  border-right: 1px solid #dddddd;
}

#myChallenges .btnSubmitStyle {
  font-weight: 600;
  padding: 3px 10px 3px 10px;
  color: black;
  font-family: "Segoe UI";
  border-radius: 14px;
  font-size: 16px;
  background-color: #dee5ff;
}

#myChallenges .titleChallenge {
  font-weight: 600;
  color: black;
  font-family: "Segoe UI";
  font-size: 20px;
}

#myChallenges .state {
  font-weight: 600;
  color: #8088ff;
  font-family: "Segoe UI";
  font-size: 18px;
}

#myChallenges .category {
  background-color: #ffec9e;
  border: 2px solid black;
  font-weight: 600;
  padding: 0px 7px 0px 7px;
  color: black;
  font-family: "Segoe UI";
  border-radius: 5px;
  font-size: 14px;
}

#myChallenges .time1 {
  font-weight: 400;
  color: black;
  font-family: "Segoe UI";
  font-size: 20px;
}

#myChallenges .time2 {
  color: rgb(138, 138, 138);
  font-family: "Segoe UI";
  font-size: 19px;
}

#myChallenges .description {
  font-weight: 500;
  color: black;
  font-family: "Segoe UI";
  font-size: 17px;
}

#myChallenges a {
  text-decoration: none;
}
</style>
