<template>
<div>
    {{programmeurs}}
</div>
</template>

<script>


export default{
data(){
    return{
        programmeurs:[]
    }
},
mounted(){
    
    this.$http.get('http://localhost:8081/consommations/' + this.$route.params.week).then(
                         (response)=>{this.programmeurs=response.data},
                         (response)=>{console.log('erreur',response)}
    )
}
}

</script>