<template>
    <div class="footer">
        <b-container>
            <b-row class="align-items-center">
                <b-col class="align-self-center">Segue-nos</b-col>
                <b-col><b-img src="../assets/Social.png" left alt="Responsive image" ></b-img></b-col>
                <b-col>Partilha</b-col><span><b-img src="../assets/partilha.png" left alt="Responsive image"></b-img></span>
                <b-col>Sobre</b-col>
                <b-col>Parceiros</b-col>
            </b-row>
             <b-row class="align-items-center">
                <b-col>© 2020 Todos os Direitos Reservados.</b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style>
.footer{
    display: flex;
    align-items: center;
    background-color: #dee5ff;
}

.col{
    padding-top: 20px;
    padding-bottom: 20px;
    font-family: 'Consolas';
    font-size: 15px;
}
</style>