<template >
<div id="consommations">
    
    <div v-for="p in consommations" :key="p.consommationId"> nom : {{p.nomCompletProgrammeur}} - nbTasses: {{p.nbTasses}} - numSemaine :{{p.numSemaine}}</div>
    
</div>
</template>

<script>


export default{
data(){
    return{
        consommations:[]
    }
},
mounted(){
    
    this.$http.get('http://localhost:8081/consommations/' + this.$route.params.week).then(
                         (response)=>{this.consommations=response.data},
                         (response)=>{console.log('erreur',response)}
    )
}
}

</script>

<style>

</style>