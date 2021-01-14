<template>
    <div id="challenges">
        <b-container fluid id="menuChallenges">
            <b-row> 
                <b-col class="text-left">
                    <b-button id="btnMyChallenges" class="btnMenu" to="/challenges/open-challenges">Abertos</b-button>
                    <b-button id="btnMyEvents" class="btnMenu ml-4" to="/challenges/next-challenges">Próximos</b-button>
                    <b-button id="btnResults" class="btnMenu ml-4" to="/challenges/closed-challenges">Fechados</b-button>
                </b-col>
                <b-col sm class="text-xl-right">
                    
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2 txtSearch" placeholder="Pesquisa..."></b-form-input>
                        <b-button size="sm" id="searchChallenge" class="my-2 my-sm-0" type="submit">
                            <b-img src="../assets/search.png" class="w-75" fluid alt="Fluid image"></b-img>
                        </b-button>
                        <b-form-select v-model="selected" :options="options"></b-form-select>                                                   
                        <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
                        <b-button id="btnFilterCategory" class="btnMenu2">Categoria</b-button>
                        <b-button id="btnFilterScientificArea" class="btnMenu2 ml-4">Área Científica</b-button>
                    </b-nav-form>
                </b-col>
            </b-row>
            <router-view></router-view>
        </b-container>
    </div>
</template>

<script>
export default {
    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Categoria' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: { C: '3PO' }, text: 'This is an option with object value' },
          { value: 'd', text: 'This one is disabled', disabled: true }
        ]
      }
    }
  }
</script>

<style>
#challenges{
    margin-top: 150px;
}

#challenges .btnMenu{
    background-color: #ececec;
    padding: 9px 20px 9px 20px;
    border-radius: 6px;
    color: black;
    font-weight: 600;
    border: 2px solid white;
    font-family: 'Segoe UI';
    font-size: 17px;
}

#challenges .router-link-exact-active {
    background-color: white;
    border: 2px solid;
}

#challenges .btnMenu2{
    font-weight: 600;
    padding: 3px 10px 3px 10px;
    color: black;
    font-family: 'Segoe UI';
    border-radius: 14px;
    font-size: 16px;
}

@media only screen and (max-width: 1400px) {
    #challenges .btnMenu{
        padding: 5px 15px 5px 15px;
        font-size: 15px;
    }

    #challenges .txtSearch{
        width: 70%;
    }
}

@media only screen and (min-width: 1000px) {
    #menuChallenges{
        width: 1200px;
    }

    #menuChallenges{
        margin-top: 100px;
    }
}

#challenges #searchChallenge{
    background-color: white;
    border: 0;
}
</style>