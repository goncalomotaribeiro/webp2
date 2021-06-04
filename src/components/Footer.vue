<template>
  <div class="footer">
    <b-container>
      <b-row class="align-items-center">
        <b-col>Segue-nos:</b-col>
        <b-icon icon="facebook" class="fa fa-facebook"></b-icon>
        <b-icon icon="instagram" class="fa fa-instagram"></b-icon>
        <b-icon icon="twitter" class="fa fa-twitter"></b-icon>
        <b-col>Partilha:</b-col>
        <b-icon icon="share" class="fa fa-share"></b-icon>
        <b-col
          sm
          style="color: #101010; font-size: 18px; font-family: 'Consolas';"
          class="mt-3 mt-lg-0"
          >Sobre</b-col
        >
        <b-col style="color: #101010; font-size: 18px;">Parceiros</b-col>
      </b-row>
      <b-row class="align-items-center">
        <b-col style="font-size: 15px">2021 Projeto Académico</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.footer {
  position: relative;
  margin-top: 200px;
  display: flex;
  align-items: center;
  background-color: #c5d2ff;
  padding-top: 10px;
}

.footer .col {
  padding-top: 20px;
  padding-bottom: 20px;
  font-family: "Consolas";
  font-size: 15px;
}

.footer .fa {
  padding: 10px;
  font-size: 30px;
  height: 35px;
  width: 35px;
  text-align: center;
  text-decoration: none;
  margin: 10px 5px;
  border-radius: 50%;
}

.footer .fa:hover {
  opacity: 0.7;
}

.fa-facebook {
  background: #3b5998;
  color: white;
}

.fa-twitter {
  background: #55acee;
  color: white;
}

.fa-instagram {
  background: #125688;
  color: white;
}

.fa-share {
  background: #b6b6b6;
  color: white;
}
</style>
