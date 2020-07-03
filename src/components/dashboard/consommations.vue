<template>
  <div class="container">
    <h5 style="text-align: center">Numero de Semaine : {{ week }}</h5>
    <br />
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
          <div v-if="isResp"
            v-on:click="transfer(c.consommationId)"
            class="float-right"
           style="cursor:pointer"
          >
            <f-icon icon="edit" class="fa-lg" />
          </div>
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
      jwtToken: "",
       isResp:this.$store.state.isResp,
      consommations: [],
      week: this.$route.params.week,
    };
  },
  mounted() {
    console.log("isResp :" +this.$store.state.isResp)
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
