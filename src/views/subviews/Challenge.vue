<template>
    <div id="challenge">
        <b-container fluid class="cover" :style="{backgroundImage:`url(${getChallenge.img})`}">
        </b-container>

        <b-container>
            <b-row>
                <b-col cols="4" class="mt-5">
                    <b-img class="profile-picture mt-3 mb-3" src="../../assets/picture-teacher.png" fluid alt="Fluid image"></b-img>
                    <p class="name mb-2">Rodrigo Moreira</p>
                    <p class="type mb-3">Docente</p>
                    <b-button class="follow">Seguir</b-button>
                </b-col>
                <b-col cols="0">
                    <div class="linha align-self-center d-none d-xl-block"></div>
                </b-col>
                <b-col cols="7" class="text-left ml-5 info">
                    <span class="challengeName">{{getChallenge.title}}</span>
                    <span class="name d-flex justify-content-end">58h 17m 34s</span>
                    <p class="challengeDescript mt-3">Lorem ipsum dolor sit amet, consecteLorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed lacinia in tortor id interdum. Quisque vitae pharetra dui. Curabitur rutrum pellentesque 
                    vulputate. Praesent lacinia est felis, ut bibendum est placerat ac. Nam non laoreet augue. 
                    Vivamus sagittis metus in feugiat interdum. Duis ac posuere justo, eget congue lorem. 
                    Nam fringilla risus scelerisque metus volutpat aliquam. Phasellus orci nulla, tempor in erat 
                    vitae, sodales lobortis sem.tur adipiscing elit...</p>
                    <b-button id="btnSubmit" class="btnSubmitStyle mt-3" v-b-modal.modal-1 v-if="submited">
                        Submeter
                        <b-img src="../../assets/arrow-right-xs.png" fluid alt="Fluid image" class="ml-5 mb-1"></b-img>
                    </b-button>
                    <b-button id="btnSubmited" class="btnSubmitedStyle mt-3" v-else>
                        Submetido
                    </b-button>
                </b-col>
            </b-row>
        </b-container>

        <!-- FORMULÁRIO CRIAR DESAFIO -->
      <b-modal id="modal-1" title="Submeter Trabalho" @ok="onSubmit" ok-title="Submeter">
        <b-row class="justify-content-md-center">
            <b-form>
                <b-form-group
                id="input-group-1"
                label="Link para Download do trabalho:"
                label-for="input-1">

                <b-form-input
                    id="input-1"
                    type="url"
                    v-model="submission.work"
                    required>
                </b-form-input>
                </b-form-group>
            </b-form>
        </b-row>
      </b-modal>
    </div>
</template>
<script>
export default {
    name: 'Challenge',
    data() {
        return {
            submission: {
                work: ""
            }
        }
    },
    methods: {
        onSubmit() {
      const submission = {
        id: this.$store.getters.getNextSubmissionId,
        user: this.$store.getters.getLoggedUser.username,
        challenge: this.$route.params.challengeId,
        work: this.submission.work,
        date: new Date().toLocaleString()
      };
        this.$store.dispatch("insertSubmission", submission);
        this.submission.work = "";
      }
    },
    computed: {
        getChallenge() {
        return this.$store.getters.getChallengeById(this.$route.params.challengeId);
        },
        submited(){

            for (const submission of this.$store.getters.getSubmissions) {
                if (this.$route.params.challengeId == submission.id) {
                    return false
                }
            }
            return true
        }
    }
}
</script>
<style>
    #challenge .cover{
        height: 230px;
        margin-top: 67px;
        border-radius: 15px;
        box-shadow: #ebceff 6px 6px;
        border: 1px solid #ebceff;
        background-position: center;
        background-size: cover;
    }

    #challenge .name{
        font-family: 'Segoe UI';
        font-weight: 600;
        color: black;
        font-size: 15pt;
        margin: 0;
    }

    #challenge .type{
        font-weight: 400;
        font-family: 'Segoe UI';
        color: black;
        font-size: 11pt;
        margin: 0;
    }

    #challenge .follow{
        background-color: #A7F6FF;
        border: 2px solid black;
        border-radius: 6px;
        padding: 3px 25px 3px 25px;
        font-weight: 500;
        font-family: 'Segoe UI';
        color: black;
        font-size: 12pt;
        margin: 0;
    }

    #challenge .linha{
        height: 230px;
        border-right: 1px solid #dddddd;
        margin-top: 70px;
    }

    #challenge .challengeName{
        font-weight: 700;
        font-family: 'Segoe UI';
        color: black;
        font-size: 20pt;
    }

    #challenge .info{
        padding-top: 70px;
    }

     #challenge .challengeDescript{
        font-weight: 500;
        font-family: 'Segoe UI';
        color: black;
        font-size: 12pt;
    }

    #challenge .btnSubmitStyle{
        background-color: white;
        border: 2px solid black;
        font-weight: 600;
        padding: 3px 10px 3px 10px;
        color: black;
        font-family: 'Segoe UI';
        border-radius: 14px;
        font-size: 16px;
    }

    #challenge .btnSubmitedStyle{
        background-color:  #DEE5FF;
        border: 2px solid black;
        font-weight: 600;
        padding: 3px 10px 3px 10px;
        color: black;
        font-family: 'Segoe UI';
        border-radius: 14px;
        font-size: 16px;
    }

    @media only screen and (min-width: 1000px) {
    #challenge .cover{
        width: 1000px;
    }

        
    @media only screen and (min-width: 1400px) {
         #challenge .profile-picture{
            width: 30%;
        }
    }

}
</style>