<template>
    <div id="forum">
        <router-view></router-view>
    </div>
</template>

<script>
export default {

  }
</script>

<style>

#events{
    margin-top: 150px;
}

#events .btnMenu{
    background-color: #ececec;
    padding: 9px 20px 9px 20px;
    border-radius: 6px;
    color: black;
    font-weight: 600;
    border: 2px solid white;
    font-family: 'Segoe UI';
    font-size: 17px;
}

#events .router-link-exact-active {
    background-color: white;
    border: 2px solid;
}

#events .btnMenu2{
    width: 150px;
    height: 35px;
    font-weight: 600;
    padding: 0px 10px 0px 10px;
    color: black;
    font-family: 'Segoe UI';
    border-radius: 20px;
    font-size: 16px;
    border: 2px solid black;
}

@media only screen and (max-width: 1400px) {
    #events .btnMenu{
        padding: 5px 15px 5px 15px;
        font-size: 15px;
    }

    #events .txtSearch{
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

#events #searchChallenge{
    background-color: white;
    border: 0;
}
</style>