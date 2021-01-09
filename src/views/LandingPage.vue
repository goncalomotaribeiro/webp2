<template>
  <div id="cards">
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col sm>AAAA</b-col>
        <b-col sm>AAAA</b-col>
        <b-col sm>AAAA</b-col>
      </b-row>

      <!--3 CARDS DE INFORMAÇÃO DO SITE-->
      <b-row class="text-center">
        <b-col sm>
          <b-card
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
            id="cardProgress"
          >
            <b-card-text id="titleProgress">
              Visualiza o teu progresso
            </b-card-text>
            <b-card-text style="font-family: Segoe UI; font-size: 14px">
              Aqui podes visualizar o teu progresso, estatísticas e toda a tua
              atividade.
            </b-card-text>
          </b-card>
        </b-col>
        <b-col sm>
          <b-card
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
            id="cardChallenges"
          >
            <b-card-text id="titleChallenges">
              Compete em desafios
            </b-card-text>
            <b-card-text
              style="padding-top: 15px;padding-right: 15px; font-family: Segoe UI; font-size: 14px"
            >
              Entra em grandes desafios criados pelos teus docentes para
              ganhares pontos e conquistas!
            </b-card-text>
          </b-card>
        </b-col>
        <b-col sm
          ><b-card
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
            id="cardEvents"
          >
            <b-card-text id="titleEvents"> Participa em eventos </b-card-text>
            <b-card-text style="font-family: Segoe UI; font-size: 14px">
              Vê os eventos que estão a acontecer no mundo universitário e
              junta-te a eles.
            </b-card-text>
          </b-card></b-col
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
.bv-example-row {
  padding-top: 70px;
}
#cardProgress {
  background: #c2e9ff;
  border: none;
  border-radius: 8px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
}
#cardChallenges {
  background: #fff2bf;
  border: none;
  border-radius: 8px;
  padding-top: 20px;
  padding-bottom: 10px;
  text-align: center;
}
#cardEvents {
  background: #ebceff;
  border: none;
  border-radius: 8px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
}
#titleProgress {
  background: white;
  border-radius: 8px;
  box-shadow: #b0c5fe 5px 5px;
  padding-bottom: 3px;
  padding-top: 3px;
  margin-left: 35px;
  margin-right: 35px;
  margin-bottom: 30px;
  font-family: "Consolas";
  font-size: 14px;
}
#titleChallenges {
  background: white;
  border-radius: 8px;
  box-shadow: #fbe696 5px 5px;
  padding-bottom: 3px;
  padding-top: 3px;
  margin-left: 35px;
  margin-right: 35px;
  margin-bottom: 5px;
  font-family: "Consolas";
  font-size: 14px;
}
#titleEvents {
  background: white;
  border-radius: 8px;
  box-shadow: #d79ffe 5px 5px;
  padding-bottom: 3px;
  padding-top: 3px;
  margin-left: 35px;
  margin-right: 35px;
  margin-bottom: 30px;
  font-family: "Consolas";
  font-size: 14px;
}
</style>