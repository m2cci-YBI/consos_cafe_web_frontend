<template>
  <div class="container">
    <table class="table table-stripped">
      <tr>
        <th>Programmeur</th>
        <th>Numero de semaine</th>
        <th>Nombre de Tasses</th>
      </tr>
      <tr v-for="c in consommations" :key="c.consommationId">
        <td>{{ c.nomCompletProgrammeur }}</td>
        <td>{{ c.numSemaine }}</td>
        <td>{{ c.nbTasses }}</td>
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
      consommations: [],
    };
  },
  mounted() {
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
        this.$router.replace("/signin");
      });
  },
};
</script>

<style></style>
