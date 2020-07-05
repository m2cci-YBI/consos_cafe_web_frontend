<template>
  <div class="container-fluid pl-0">
    <div class="row justify-content-center">
      
    
    <div class="col-md-3 pl-0 " v-if="isResp">
      
      <div
        class="card text-center bg-secondary text-white "
        style="border-radius:0px"
      >
        <div class="card-body">
          <h3>Consommations</h3>
          <div>
            <f-icon icon="coffee" class="fa-3x"></f-icon>
          </div>
          <br />
          <router-link to="/dashboard" class="btn btn-outline-light btn-sm"
            >Voir</router-link
          >
        </div>
      </div>
      <div
        class="card text-center bg-primary text-white "
        style="border-radius:0px"
      >
        <div class="card-body">
          <h3>Programmeurs</h3>
          <div>
            <f-icon icon="users" class="fa-3x"></f-icon>
          </div>
          <br />
          <router-link to="/dashboard/programmeurs" class="btn btn-outline-light btn-sm"
            >Voir</router-link
          >
        </div>
      </div>
      <div
        class="card text-center bg-success text-white  "
        style="border-radius:0px"
      >
        <div class="card-body">
          <h3>Statistiques</h3>
          <div>
            <f-icon icon="chart-area" class="fa-3x"></f-icon>
          </div>
          <br />
          <router-link to="/dashboard/affichageGraphique" class="btn btn-outline-light btn-sm"
            >Voir</router-link
          >
        </div>
      </div>
    </div>
    <div class="col-md-9 ">
      <br>
      <router-view></router-view>
    </div>
    </div >
  </div>
</template>



<script>
export default {
data(){
  return{
    isResp:false
  }
},
mounted(){
  this.isResp=this.$store.state.isResp
  console.log(this.$store.state.isResp);

}
}
</script>



<style scoped>
h3 {
  text-align: center;
  font-family: Times New Roman;
}
</style>
