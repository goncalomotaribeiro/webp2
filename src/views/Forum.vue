<template>
  <div id="forum">
    <b-container fluid class="bv-example-row" id="">
      <b-row class="text-left offset-lg-2">
        <b-col class="text-left">
          <h1 class="ml-4">Fórum</h1>
          <b-nav-form id="frmSearchTopic">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Pesquisar tópico..."></b-form-input>
            <b-button size="sm" id="btnSearch" class="my-2 my-sm-0" type="submit"><b-img src="../assets/search.png" class="w-75" fluid alt="Fluid image"></b-img></b-button>
          </b-nav-form>
        </b-col>
        <b-col class="text-left" id="colBox">
          <b-card tag="article" class="mb-2" id="cardIdeasBox">
            <b-card-text id="titleIdeas">Caixa de ideias </b-card-text>
            <small>Partilha atividades criativas para toda a comunidade!</small>
          </b-card>
        </b-col>
      </b-row>
      <hr>

      <b-row>
      </b-row>
    </b-container>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
#forum {
  margin-top: 150px;
}

h1 {
  font-family: "Segoe UI";
  font-size: 50px;
  text-transform: uppercase;
  font-weight: bold;
  color: #131313;
  padding-bottom: 5%;
}

#btnSearch{
  background: none;
  border: none;
}

#colBox {
  padding-right: 25%;
  padding-left: 30%;
  margin-bottom: 50px;
}

#cardIdeasBox {
  border: solid 2px black;
  border-radius: 10px;
  box-shadow: #ebceff -15px 15px;
}

#titleIdeas {
  background: #fff9c5;
  border-radius: 5px;
  font-family: "Ebrima";
  font-weight: bold;
  font-size: 16px;
}

hr{
  margin-left: 250px;
  margin-right: 250px;

}

</style>