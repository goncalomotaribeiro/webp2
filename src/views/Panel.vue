<template>
    <div id="panel">
        <b-container id="cover">
            <b-row class="mb-4">
                <b-col>
                    <b-img class="level mt-5" src="../assets/level.png" fluid alt="Fluid image"></b-img>
                </b-col>
            </b-row>
            <b-row class="text-left" sm>
                <b-col  cols="lg-2" class="d-flex justify-content-center mb-3">
                    <b-img class="profile-picture" src="../assets/profile-picture2.png" fluid alt="Fluid image"></b-img>
                </b-col>
                <b-col cols="lg-7" class="d-flex justify-content-center flex-column">
                    <b-row class="info1">
                        <b-col>
                            Carlos Pereira <span>Estudante</span>
                        </b-col>
                    </b-row><br>
                     <b-row class="info2" style="padding-top:10px; padding-bottom: 10px;">
                         <b-col >
                            <b-img src="../assets/hat.png" fluid alt="Fluid image" class="mr-2"></b-img>1500 <span>Pontos</span>
                        </b-col>
                        <b-col>
                            10 <br class="d-sm-none"> <span>Seguidores</span>
                        </b-col>
                        <b-col>
                            500 <br class="d-sm-none"><span>A seguir</span>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col class="d-flex justify-content-center align-items-lg-end justify-content-lg-end mb-xl-4 pb-xl-2 mt-4">
                    <b-button id="btnEditProfile">Editar Perfil</b-button>
                </b-col>
            </b-row>
        </b-container>
        <h1>Authenticated area</h1>
        <h2>Email: {{getUser}}</h2>
    </div>
</template>

<script>
export default {
    name:'Panel',
    computed: {
        getUser() {
            return this.$store.getters.getLoggedUser.email
        }
    }
}
</script>

<style>

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

#btnEditProfile{
    margin-right: 15px;
    background-color: white;
    border-radius: 20px;
    color: black;
    font-weight: 600;
    border: 2px solid;
    font-family: 'Consolas';
    font-size: 12px;
}

.info1 span, .info2 span{
    font-weight: 500;
}

#cover{
    padding-bottom: 15px;
    margin-top: 67px;
    border-radius: 20px;
    background-image: url('../assets/profile-cover.png');
    background-position: center;
}

@media only screen and (min-width: 1000px) {
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
</style>