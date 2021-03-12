<template>
  <div id="forum">
    <b-container fluid class="bv-example-row" id="">
      <b-row class="text-left offset-lg-2">
        <b-col class="text-left">
          <h1>Fórum</h1>
        </b-col>
        <b-col class="text-left" id="colBox">
          <b-card tag="article" class="mb-2" id="cardIdeasBox">
            <b-card-text id="titleIdeas">Caixa de ideias </b-card-text>
            <small
              >Partilha atividades criativas para toda a comunidade!
            </small>
          </b-card>
        </b-col>
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
}

#colBox {
  padding-top: 5%;
  padding-right: 25%;
  padding-left: 25%;
}

#cardIdeasBox {
  box-shadow: #ebceff -25px 15px;
}

#titleIdeas {
  background: #fff9c5;
  border-radius: 5px;
  font-family: "Ebrima";
  font-weight: bold;
  font-size: 16px;
}
</style>