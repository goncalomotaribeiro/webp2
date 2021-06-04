<template>
  <b-link :to="{ name: 'Challenge', params: { challengeId: getChallenge.id } }">
    <b-row class="cardChallenge mt-5">
      <b-col cols="lg-2" class="text-xl-left">
        <b-img
          :src="getChallenge.img"
          alt="Fluid image"
          class="imgUserChallenge"
        ></b-img>
      </b-col>
      <b-col
        cols="0"
        class="d-flex flex-column justify-content-between text-xl-left"
      >
        <b-row>
          <b-col class="titleChallenge">{{ getChallenge.title }}</b-col>
        </b-row>
        <b-row>
          <b-col class="state mb-2">{{ getChallengeState.state }}</b-col>
        </b-row>
        <b-row>
          <b-col
            cols="0"
            :style="{ 'background-color': getScientificArea.color }"
            class="category ml-3"
            >{{ getScientificArea.name }}</b-col
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
          <b-col class="time1">58h 17m 34s</b-col>
        </b-row>
        <b-row>
          <b-col class="time2">Tempo</b-col>
        </b-row>
      </b-col>
      <div class="linha align-self-center ml-5 d-none d-xl-block"></div>
      <b-col class="align-self-center text-xl-left ml-5">
        <b-row>
          <b-col class="description">{{
            getDescription(getChallenge.description)
          }}</b-col>
        </b-row>
      </b-col>
      <b-col sm class="p-0 align-self-center">
        <b-row>
          <b-col>
            <b-img src="../assets/badge.png"></b-img>
          </b-col>
        </b-row>
        <router-link
          :to="{ name: 'Challenge', params: { challengeId: getChallenge.id } }"
          class="stretched-link"
        ></router-link>
      </b-col>
    </b-row>
  </b-link>
</template>

<script>
export default {
  name: "CardChallengePanel",
  props: {
    submission: Object
  },
  computed: {
    getScientificArea() {
      return this.$store.getters.getScientificAreasById(
        this.getChallenge.scientific_area
      );
    },
    getChallenge() {
      return this.$store.getters.getChallengeById(this.submission.challenge);
    },
    getChallengeState() {
      return this.$store.getters.getChallengeStateById(this.getChallenge.state);
    }
  },
  methods: {
    getDescription(desc) {
      return desc.substring(0, 50) + "...";
    }
  }
};
</script>

<style>
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
