<template>
    <b-card :img-src="challenge.img" img-top class="cardChallenge ml-xl-4">
        <b-row>
            <b-col cols="0" :style="{'background-color': getScientificArea.color}" class="category ml-3">{{getScientificArea.name}}</b-col>
        </b-row>
        <b-row class="text-left mt-3">
            <b-col cols="0" class="state d-flex align-self-center ml-4 mr-3">aberto</b-col>
            <b-col>
                <b-row>
                    <b-col class="titleChallenge">{{challenge.title}}</b-col>
                </b-row>
                <b-row>
                    <b-col class="description mt-1 mb-1" >{{challenge.description}}</b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
export default {
    name: "CardChallenge",
    props: {
    challenge: Object
  },
  computed: {
    getScientificArea() {
      return this.$store.getters.getScientificAreasById(this.challenge.scientific_area);
    },
  }
}
</script>

<style>

@media only screen and (min-width: 1000px) {
    #openChallenges .cardChallenge{
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
    #openChallenges .cardChallenge{
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


#openChallenges .btnSubmitStyle{
    font-weight: 600;
    padding: 3px 10px 3px 10px;
    color: black;
    font-family: 'Segoe UI';
    border-radius: 14px;
    font-size: 16px;
}

#openChallenges .titleChallenge{
    font-weight: 600;
    color: black;
    font-family: 'Segoe UI';
    font-size: 20px;
}

#openChallenges .state{
    font-weight: 600;
    color: #8088FF;
    font-family: 'Segoe UI';
    font-size: 18px;
}

#openChallenges .category{
    border: 2px solid black;
    font-weight: 600;
    padding: 1px 10px 1px 10px;
    color: black;
    font-family: 'Segoe UI';
    border-radius: 5px;
    font-size: 15px;
}

#openChallenges .time1{
    font-weight: 400;
    color: black;
    font-family: 'Segoe UI';
    font-size: 20px;
}

#openChallenges .time2{
    color: rgb(138, 138, 138);
    font-family: 'Segoe UI';
    font-size: 19px;
}

#openChallenges .description{
    font-weight: 500;
    color: black;
    font-family: 'Segoe UI';
    font-size: 17px;
}
</style>