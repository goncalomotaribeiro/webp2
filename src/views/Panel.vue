<template>
    <div id="panel">
        <!--CAPA-->
        <b-container fluid id="cover">
            <b-row>
                <b-col>
                    <b-img class="level mt-5" src="../assets/level.png" fluid alt="Fluid image"></b-img>
                </b-col>
            </b-row>
            <b-row class="text-left" lg>
                <b-col  cols="lg-2" class="d-flex justify-content-center mb-3">
                    <b-img class="profile-picture mt-3" src="../assets/profile-picture2.png" fluid alt="Fluid image"></b-img>
                </b-col>
                <b-col cols="xl-7" class="d-flex justify-content-center flex-column">
                    <b-row class="info1">
                        <b-col>
                            Carlos Pereira <span>Estudante</span>
                        </b-col>
                    </b-row><br>
                     <b-row class="info2" style="padding-top:10px; padding-bottom: 10px;">
                         <b-col >
                            <b-img src="../assets/hat.png" fluid alt="Fluid image" class="mr-2"></b-img>1500 <br class="d-lg-none"><span>Pontos</span>
                        </b-col>
                        <b-col>
                            10 <br class="d-lg-none"><span>Seguidores</span>
                        </b-col>
                        <b-col>
                            500 <br class="d-lg-none"><span>A seguir</span>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col class="d-flex justify-content-center align-items-lg-end justify-content-lg-end mb-xl-4 pb-xl-2 mt-4">
                    <b-button id="btnEditProfile">Editar Perfil</b-button>
                </b-col>
            </b-row>
        </b-container>

        <b-container fluid id="tab">
            <!--MEUS DESAFIOS-->
            <div v-if="this.myChallenges" class="text-left">
                <b-row >
                    <b-col>
                        <b-button id="btnMyChallenges" class="btnMenuActive">Meus Desafios</b-button>
                        <b-button v-on:click="OpenMyEvents" id="btnMyEvents" class="btnMenu ml-4">Meus Eventos</b-button>
                        <b-button v-on:click="OpenResults" id="btnResults" class="btnMenu ml-4">Resultados</b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        
                    </b-col>
                </b-row>
            </div>

            <!--MEUS EVENTOS-->
            <div v-if="this.myEvents" class="text-left">
                <b-row>
                    <b-col>
                        <b-button v-on:click="OpenMyChallenges" id="btnMyChallenges" class="btnMenu">Meus Desafios</b-button>
                        <b-button id="btnMyEvents" class="btnMenuActive ml-4">Meus Eventos</b-button>
                        <b-button v-on:click="OpenResults" id="btnResults" class="btnMenu ml-4">Resultados</b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        
                    </b-col>
                </b-row>
            </div>

            <!--RESULTADOS-->
            <div v-if="this.results" class="text-left">
                <b-row>
                    <b-col>
                        <b-button v-on:click="OpenMyChallenges" id="btnMyChallenges" class="btnMenu shadow-none">Meus Desafios</b-button>
                        <b-button v-on:click="OpenMyEvents" id="btnMyEvents" class="btnMenu ml-4 shadow-none">Meus Eventos</b-button>
                        <b-button id="btnResults" class="btnMenuActive ml-4">Resultados</b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        
                    </b-col>
                </b-row>
            </div>
        </b-container>

        <h1 style="margin-top: 100px">Authenticated area</h1>
        <h2>Email: {{getUser}}</h2>
    </div>
</template>

<script>
export default {
    name:'Panel',
    data() {
        return {
        myChallenges: true,
        myEvents: false,
        results: false
        }
    },
    computed: {
        getUser() {
            return this.$store.getters.getLoggedUser.email
        }
    },
    methods: {
      OpenMyChallenges() {
          this.myChallenges = true;
          this.myEvents = false, this.results = false;
      },
      OpenMyEvents() {
          this.myEvents = true;
          this.myChallenges = false, this.results = false;
      },
      OpenResults() {
          this.results = true;
          this.myChallenges = false, this.myEvents = false;
      }
  }
}
</script>

<style>
#cover{
    padding-bottom: 5px;
    margin-top: 67px;
    border-radius: 30px;
    background-image: url('../assets/profile-cover.png');
    background-position: center;
}

.info1, .info2{
    box-shadow: #8088FF 6px 6px;
    font-weight: 600;
    background-color: #ffffff;
    border-radius: 7px;
    padding: 7px 5px 7px 5px;
    color: black;
    font-size: 17px;
    font-family: "Consolas";
}

.info1 span, .info2 span{
    font-weight: 500;
}

#btnEditProfile{
    margin-right: 25px;
    background-color: white;
    border-radius: 20px;
    color: black;
    font-weight: 600;
    border: 2px solid;
    font-family: 'Consolas';
    font-size: 12px;
}

@media only screen and (min-width: 1400px) {
    .profile-picture{
        width: 70%;
    }
}

@media only screen and (min-width: 1000px) {
    #cover{
        width: 1200px;
    }

    #tab{
        width: 1200px;
    }

    .level{
        width: 7%;
    }

    .info1{
        width: 50%;
    }

    .info2{
        width:90%;
    }
}

@media only screen and (max-width: 1000px) {
    .profile-picture{
        width: 25%;
    }

    #cover{
        padding-left: 50px;
        padding-right: 50px;
        padding-bottom: 30px;
    }
}

#tab{
    margin-top: 100px;
}

#tab .btnMenu, #tab .btnMenuActive{
    background-color: #ececec;
    padding: 9px 20px 9px 20px;
    border-radius: 6px;
    color: black;
    font-weight: 600;
    border: 2px solid white;
    font-family: 'Segoe UI';
    font-size: 18px;
}

#tab .btnMenuActive{
    background-color: white;
    border: 2px solid;
}

#tables{
    margin-top: 50px;
}
</style>