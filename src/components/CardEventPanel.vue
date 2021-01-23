<template>
    <b-link :to="{name: 'Event', params:{eventId: getEvent.id}}">
        <b-row class="cardChallenge mt-5">
            <b-col cols="lg-2" class="text-xl-left">
                <b-img :src="getEvent.img"  alt="Fluid image" class="imgUserChallenge"></b-img>
            </b-col>
            <b-col cols="0" class="d-flex flex-column justify-content-between text-xl-left">
                <b-row>
                    <b-col class="titleChallenge">{{getEvent.title}}</b-col>
                </b-row>
                <b-row>
                    <b-col class="state mb-2">Aberto</b-col>
                </b-row>
                <b-row>
                    <b-col cols="0" :style="{'background-color': getScientificArea.color}" class="category ml-3">{{getScientificArea.name}}</b-col>
                </b-row>
            </b-col>
            <div class="linha align-self-center d-none d-xl-block" style="margin-left:90px"></div>
            <b-col cols="0" class="d-flex flex-column justify-content-around ml-5 mt-2 mb-2">
                <b-row>
                    <b-col class="time1">{{getEvent.date}}</b-col>
                </b-row>
                <b-row>
                    <b-col class="time2">Data</b-col>
                </b-row>
            </b-col>
            <div class="linha align-self-center ml-5 d-none d-xl-block"></div>
            <b-col class="align-self-center text-xl-left ml-5">
                <b-row>
                    <b-col class="description">{{ getDescription(getEvent.description)}}</b-col>
                </b-row>
            </b-col>
            <b-col sm class="p-0 align-self-center">
                <b-row>
                    <b-col>
                        <b-button @click="deleteMyEvent" id="btnSubmit" class="btnSubmitStyle" to="/panel/my-events">
                            Remover
                        </b-button>
                    </b-col>
                </b-row>
                <router-link  class="stretched-link" ></router-link>
            </b-col>
        </b-row>
    </b-link>
</template>

<script>
export default {
    name: "CardChallengePanel",
    props: {
    myEvent: Object
    },
    computed: {
        getScientificArea() {
        return this.$store.getters.getScientificAreasById(this.getEvent.scientific_area);
        },
        getEvent() {
        return this.$store.getters.getMyEventById(this.myEvent.event);
        }
    },
    methods: {
        getDescription(desc) {
            return desc.substring(0, 50) + '...';
        },
        deleteMyEvent() {
            this.$store.dispatch("deleteMyEvent", this.myEvent.event);
        },
    }
}
</script>

<style>
#myEvents .cardChallenge{
    padding: 20px 20px 20px 20px;
    border-radius: 13px;
    border: 1px solid #dddddd;
}
#myEvents .imgUserChallenge{
    border-radius: 6px;
    width: 140px;
    height: 116px;
    object-fit: cover;
}
#myEvents .linha{
    height: 90px;
    border-right: 1px solid #dddddd;
}

#myEvents .btnSubmitStyle{
    border: 2px solid black;
    font-weight: 600;
    padding: 3px 15px 3px 15px;
    color: black;
    font-family: 'Segoe UI';
    border-radius: 14px;
    font-size: 16px;
    background-color: #ffdcdc;
    z-index: 2;
}

#myEvents .titleChallenge{
    font-weight: 600;
    color: black;
    font-family: 'Segoe UI';
    font-size: 20px;
}

#myEvents .state{
    font-weight: 600;
    color: #8088FF;
    font-family: 'Segoe UI';
    font-size: 18px;
}

#myEvents .category{
    background-color: #FFEC9E;
    border: 2px solid black;
    font-weight: 600;
    padding: 0px 7px 0px 7px;
    color: black;
    font-family: 'Segoe UI';
    border-radius: 5px;
    font-size: 14px;
}

#myEvents .time1{
    font-weight: 400;
    color: black;
    font-family: 'Segoe UI';
    font-size: 20px;
}

#myEvents .time2{
    color: rgb(138, 138, 138);
    font-family: 'Segoe UI';
    font-size: 19px;
}

#myEvents .description{
    font-weight: 500;
    color: black;
    font-family: 'Segoe UI';
    font-size: 17px;
}

#myEvents a {
    text-decoration: none;
}
</style>