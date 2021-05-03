<template>
  <div id="landingPage">
    <!--  ------------ RETANGULO INICIAL  ------------ -->
    <b-container fluid class="bv-example-row" id="firstDiv">
      <b-row class="text-left offset-lg-2">
        <b-col sm>
          <h4>Participa em desafios</h4>
          <h4>e eventos criados</h4>
          <h4>por docentes da tua</h4>
          <h4>faculdade.</h4>
          <p class="mt-4 mb-4">Participa em Desafios e Eventos criados por<br>docentes da tua faculdade.</p>
          <b-button id="btnJunta"  type="submit" to="/register">Junta-te!<b-img src="../assets/arrow-right.png" id="imgBtnJunta" class="ml-3" alt=""></b-img></b-button>
        </b-col>

        <!--  ------------ LINHAS ROXAS  ------------ -->
        <b-col sm class="mt-5">
          <hr class="one" />
          <hr class="one" />
          <hr class="one" />
          <hr class="one" />
        </b-col>
      </b-row>
    </b-container>

    <b-container>
      <!--  ------------ INFORMAÇÃO DO SITE  ------------ -->
      <b-row class="text-center">
        <b-col sm>
          <b-card tag="article" class="mb-2" id="cardProgress">
            <b-card-text id="titleProgress">Visualiza o teu progresso</b-card-text>
            <b-card-text style="font-family: Segoe UI; font-size: 14px">
              Aqui podes visualizar o teu progresso, estatísticas e toda a tua
              atividade.
            </b-card-text>
          </b-card>
        </b-col>
        <b-col sm>
          <b-card tag="article" class="mb-2" id="cardChallenges">
            <b-card-text id="titleChallenges">
              Compete em desafios
            </b-card-text>
            <b-card-text style="padding-top: 15px; padding-right: 15px; font-family: Segoe UI; font-size: 14px;">
              Entra em grandes desafios criados pelos teus docentes para
              ganhares pontos e conquistas!
            </b-card-text>
          </b-card>
        </b-col>
        <b-col sm>
          <b-card tag="article" class="mb-2" id="cardEvents">
            <b-card-text id="titleEvents"> Participa em eventos </b-card-text>
            <b-card-text style="font-family: Segoe UI; font-size: 14px">
              Vê os eventos que estão a acontecer no mundo universitário e
              junta-te a eles.
            </b-card-text>
          </b-card></b-col>
      </b-row>

      <!-- ------------ COLABORADORES ------------ -->
      <h4 id="h4Colab">Colaboradores</h4>
      <b-row class="text-center" id="divColab">
        <b-col sm>
          <b-img src="../assets/p1.jpg" id="p1" alt="colaborador número 1"></b-img>
        </b-col>
        <b-col sm>
          <b-img src="../assets/p2.jpg" id="p2" alt="colaborador número 2"></b-img>
        </b-col>
        <b-col sm>
          <b-img src="../assets/p3.jpg" id="p3" alt="colaborador número 3"></b-img>
        </b-col>
        <b-col sm>
          <b-img src="../assets/p4.jpg" id="p4" alt="colaborador número 4"></b-img>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
#firstDiv {
  background: #f5e6ff;
  margin-top: 150px;
  margin-bottom: 100px;
  padding-top: 70px;
  padding-bottom: 70px;
}

#firstDiv h4 {
  color: #202020;
  font-family: "Consolas";
  font-display: block;
  font-weight: bold;
}

#btnJunta {
  font-weight: 500;
  font-family: 'Segoe UI';
  color: #000000;
  padding: 10px 15px 10px 25px;
  border: #333333 2px solid;
  background-color: #ffffff;
  border-radius: 5px;
}

#btnJunta:hover {
  box-shadow: #fff2bf 8px 8px;
}

#btnJunta > img {
  width: 13px;
  height: 15px;
}


@media only screen and (min-width: 1000px) {
  .one{
    margin-right: 50%;
    width: 50%;
  }
}

.one {
  background: #cf98f3;
  margin-top: 30px;
  display: block;
  transform: rotate(-10deg);
}

@media only screen and (min-width: 1000px) {
  #cardProgress, #cardChallenges, #cardEvents{
    max-width: 20rem;
  }
}

#cardProgress {
  background: #c2e9ff;
  border: none;
  border-radius: 8px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  margin-top: 20px;
}

#cardChallenges {
  background: #fff2bf;
  border: none;
  border-radius: 8px;
  padding-top: 20px;
  padding-bottom: 10px;
  text-align: center;
  margin-top: 20px;
}

#cardEvents {
  background: #ebceff;
  border: none;
  border-radius: 8px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  margin-top: 20px;
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

#h4Colab {
  padding-top: 100px;
  padding-bottom: 30px;
  font-family: "Consolas";
}

@media only screen and (min-width: 1000px) {
  #h4Colab{
    padding-top: 150px;
  }
}


#divColab {
  margin-bottom: 200px;
  font-family: "Consolas";
  font-size: 11px;
  color: rgb(0, 0, 0);
  font-style: italic;
}

#p1, #p2, #p3, #p4{
  width: 200px;
  height: 140px;
}

</style>