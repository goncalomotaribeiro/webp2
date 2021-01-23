<template>
    <div id="challenge">
        Challenge: {{$route.params.challengeId}}
    </div>
</template>
<script>
export default {
    name: 'Challenge'
}
</script>
<style>
    #challenge{
        margin-top: 100px;
    }
</style>