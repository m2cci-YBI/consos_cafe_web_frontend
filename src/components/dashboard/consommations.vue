<template>
  <div class="container">
    <h5 style="text-align: center">Numero de Semaine : {{ week }}</h5>
    <br />
    <div
      v-if="isAjour"
      class="alert alert-success"
      style="margin-top: 10px ;text-align: center"
    >
      <strong>Mise à jour de la liste realisé avec succes</strong>
    </div>
    <span v-if="isResp" v-on:click="add(week)" class="float-right" style="cursor:pointer" >
      <f-icon icon="plus" class="fa-lg" />
    </span>
    <table class="table table-stripped">
      <tr>
        <th>Programmeur</th>
        <th>
          Nombre de Tasses
        </th>
      </tr>
      <tr
        
        v-for="c in consommations"
        :key="c.consommationId"
      >
        <td>{{ c.nomCompletProgrammeur }}</td>
        <td >
          <span> {{ c.nbTasses }}</span>
          <span v-if="isResp"  
            v-on:click="deleteConso(c.consommationId)"
            class="float-right ml-2"
           style="cursor:pointer"
          >
            <f-icon icon="trash" class="fa-lg" />
          </span>
          <span v-if="isResp"
            v-on:click="transfer(c.consommationId)"
            class="float-right"
           style="cursor:pointer"
          >
            <f-icon icon="edit" class="fa-lg" />
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isAjour:false,
      jwtToken: "",
       isResp:this.$store.state.isResp,
      consommations: [],
      week: this.$route.params.week,
    };
  },
  mounted() {
    this.isAjour=this.$route.query.isAjour;
    if (this.jwtToken == "") this.jwtToken = localStorage.getItem("jwtToken");

    axios
      .get("http://localhost:8081/consommations/" + this.$route.params.week, {
        headers: { Authorization: this.jwtToken },
      })
      .then((response) => {
        this.consommations = response.data;
      })
      .catch((error) => {
        console.log("erreur", error);
        localStorage.removeItem("jwtToken");
        //this.$router.replace("/signin");
      });
  },
  methods: {
    deleteConso:function(id){
axios
      .delete("http://localhost:8081/consommations/" + id, {
        headers: { Authorization: this.jwtToken },
      })
      .then((response) => {
        console.log(response.data);
        this.consommations=this.consommations.filter(c=>c.consommationId!=id);
        this.isAjour=true;
      })
      .catch((error) => {
        console.log("erreur", error);
        localStorage.removeItem("jwtToken");
        //this.$router.replace("/signin");
      });
    },
    
    transfer: function(id) {
      this.$store.state.consommation = this.consommations.filter(
        (c) => c.consommationId == id
      );
      this.$router.replace("/dashboard/updateConso?mode=update");
    },
    add: function(week) {
      this.$router.replace("/dashboard/updateConso?mode=ajout&week="+week);
    },
  },
};
</script>

<style></style>
