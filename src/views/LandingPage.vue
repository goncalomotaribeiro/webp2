<template>
  <div id="cards">
    <!--  ------------ RETANGULO INICIAL  ------------ -->
    <b-row class="text-left" id="firstDiv">
      <b-col sm>
        <h4>Participa em desafios</h4>
        <h4>e eventos criados</h4>
        <h4>por docentes da tua</h4>
        <h4>faculdade.</h4>
        <br />
        <b-button
          id="btnJunta"
          type="submit"
          to="/register"
          data-target="#register"
          style="transform: rotate(2deg)"
        >
          Junta-te</b-button
        >
      </b-col>

      <!--  ------------ LINHAS ROXAS  ------------ -->
      <b-col sm class="text-right" style="margin-top: 50px">
        <hr class="one" />
        <hr class="one" />
        <hr class="one" />
        <hr class="one" />
      </b-col>
    </b-row>

    <b-container class="bv-example-row">
      <!--  ------------ INFORMAÇÃO DO SITE  ------------ -->
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
              style="
                padding-top: 15px;
                padding-right: 15px;
                font-family: Segoe UI;
                font-size: 14px;
              "
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

      <!-- ------------ COLABORADORES ------------ -->
      <h4 id="h4Colab">Colaboradores</h4>
      <b-row class="text-center" id="divColab">
        <b-col sm>
          <b-img src="../assets/p1.jpg" fluid alt="Responsive image"></b-img>
        </b-col>
        <b-col sm>
          <b-img src="../assets/p2.jpg" fluid alt="Responsive image"></b-img>
        </b-col>
        <b-col sm>
          <b-img src="../assets/p3.jpg" fluid alt="Responsive image"></b-img>
        </b-col>
        <b-col sm>
          <b-img src="../assets/p4.jpg" fluid alt="Responsive image"></b-img>
        </b-col>
      </b-row>
    </b-container>

    <!-- ------------ FOOTER ------------ -->
    <div class="footer">
      <b-row id="divColab">
        <b-col sm>
          <b-row>
            <b-col
              style="
                padding-left: 150px;
                padding-top: 5px;
                color: #101010;
                opacity: 0.5;
              "
              ><p>Segue-nos</p></b-col
            >
            <b-col
              ><b-img
                src="../assets/Social.png"
                left
                alt="Responsive image"
                style="height: 25px"
              ></b-img
            ></b-col>
          </b-row>
        </b-col>

        <b-col sm>
          <b-row>
            <b-col
              style="
                padding-left: 150px;
                padding-top: 5px;
                color: #101010;
                opacity: 0.5;
              "
              ><p>Partilha</p>
            </b-col>
            <b-col
              ><b-img
                src="../assets/partilha.png"
                left
                alt="Responsive image"
                style="height: 25px"
              ></b-img>
            </b-col>
          </b-row>
        </b-col>

        <b-col sm>
          <b-row>
            <b-col style="padding-top: 5px">Sobre</b-col>
            <b-col style="padding-top: 8px">Parceiros</b-col>
          </b-row>
        </b-col>

        <b-col style="padding-top: 8px"
          ><p>© 2020 Todos os Direitos Reservados.</p>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#firstDiv {
  background: #f5e6ff;
  margin-top: 170px;
  margin-bottom: 150px;
  padding-top: 70px;
  padding-bottom: 70px;
  transform: rotate(-2deg);
}

#firstDiv h4 {
  margin-left: 150px;
  color: #202020;
  font-family: "Consolas";
  font-display: block;
  font-weight: bold;
  transform: rotate(2deg);
}

#btnJunta {
  color: #202020;
  font-family: "Segoe UI";
  font-size: 12px;
  padding-left: 30px;
  padding-right: 30px;
  margin-left: 180px;
  border: #131313 1.5px solid;
  font-weight: 500;
  background-color: #ffffff;
}

.one {
  background: #cf98f3;
  height: 1px;
  width: 300px;
  margin-top: 23px;
  display: block;
  transform: rotate(-1deg);
}

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

#h4Colab {
  padding-top: 200px;
  padding-bottom: 30px;
  font-family: "Consolas";
}

#divColab {
  margin-bottom: 200px;
  font-family: "Consolas";
  font-size: 11px;
  color: black;
  font-style: italic;
}

.footer {
  height: 75px;
  padding-top: 25px;
  background-color: #dee5ff;
}
</style>