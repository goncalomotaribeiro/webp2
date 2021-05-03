<template>
    <b-card :img-src="event.img" img-top class="cardChallenge ml-xl-4">
        <b-row>
            <span v-if="getEventState.state == 'Próximo'">
                <b-button @click="onSubmit" class="btnMyEvent" v-if="myEvents">
                    <b-img src="../assets/diamond.png" id="diamond"></b-img>
                </b-button>
                <b-button @click="deleteMyEvent" class="btnMyEventActive" v-else>
                    <b-img src="../assets/diamond-active.png" id="diamondActive"></b-img>
                </b-button>
            </span>
        </b-row>
        <b-row>
            <b-col cols="0" :style="{'background-color': getScientificArea.color}" class="category ml-3">{{getScientificArea.name}}</b-col>
        </b-row>
        <b-row class="text-left mt-3">
            <b-col cols="0" class="state d-flex align-self-center ml-4 mr-3" v-if="getEventState.state != 'Próximo'">{{getEventState.state}}</b-col>
            <b-col cols="0" class="state d-flex align-self-center ml-4 mr-3" v-else>18 FEV</b-col>
            <b-col>
                <b-row>
                    <b-col class="titleChallenge">{{event.title}}</b-col>
                </b-row>
                <b-row>
                    <b-col class="description mt-1 mb-1" >{{getDescription(event.description)}}</b-col>
                </b-row>
            </b-col>
            <router-link :to="{name: 'Event', params:{eventId: event.id}}" class="stretched-link" ></router-link>
        </b-row>
        
    </b-card>
</template>

<script>
export default {
    name: "CardEvent",
    props: {
    event: Object
  },
  computed: {
    getScientificArea() {
      return this.$store.getters.getScientificAreasById(this.event.scientific_area);
    },
    myEvents(){

        for (const myEvent of this.$store.getters.getMyEvents) {
            if (this.event.id == myEvent.event) {
                return false
            }
        }
            return true
    },
    getEventState() {
      return this.$store.getters.getEventStateById(this.event.state);
    }
    
  },
  methods: {
        getDescription(desc) {
            return desc.substring(0, 40) + '...';
        },
        onSubmit() {
            const myEvent = {
            id: this.$store.getters.getNextMyEventId,
            event: this.event.id,
            user: this.$store.getters.getLoggedUser.id
            };
            this.$store.dispatch("insertMyEvent", myEvent);
        },
        deleteMyEvent() {
            this.$store.dispatch("deleteMyEvent", this.event.id);
        },
    },
}
</script>

<style>

@media only screen and (min-width: 1000px) {
    #nextEvents .cardChallenge{
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

    #diamond, #diamondActive{
        width: 15px;
        height: 35px;
    }
}

@media only screen and (max-width: 1000px) {
    #nextEvents .cardChallenge{
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


#nextEvents .btnSubmitStyle{
    font-weight: 600;
    padding: 3px 10px 3px 10px;
    color: black;
    font-family: 'Segoe UI';
    border-radius: 14px;
    font-size: 16px;
}

#nextEvents .titleChallenge{
    font-weight: 600;
    color: black;
    font-family: 'Segoe UI';
    font-size: 20px;
}

#nextEvents .state{
    font-weight: 600;
    color: #8088FF;
    font-family: 'Segoe UI';
    font-size: 18px;
}

#nextEvents .category{
    border: 2px solid black;
    font-weight: 600;
    padding: 1px 10px 1px 10px;
    color: black;
    font-family: 'Segoe UI';
    border-radius: 5px;
    font-size: 15px;
}

#nextEvents .time1{
    font-weight: 400;
    color: black;
    font-family: 'Segoe UI';
    font-size: 20px;
}

#nextEvents .time2{
    color: rgb(138, 138, 138);
    font-family: 'Segoe UI';
    font-size: 19px;
}

#nextEvents .description{
    font-weight: 500;
    color: black;
    font-family: 'Segoe UI';
    font-size: 17px;
}

#nextEvents .btnMyEvent{
    position: absolute;
    top: 5px;
    width: 15%;
    height: 13%;
    background-color: white;
    border-radius: 60px;
    border: 2px solid black;
    z-index: 2;
}

#nextEvents .btnMyEventActive{
    position: absolute;
    top: 5px;
    width: 15%;
    height: 13%;
    background-color: #FFF3C2;
    border-radius: 60px;
    border: 2px solid black;
    z-index: 2;
}
</style>