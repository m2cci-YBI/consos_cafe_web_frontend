<template>
  <div class="container">
    <table class="table table-stripped">
      <strong>Numero de Semaine : {{ week }}</strong>
      <tr>
        <th>Programmeur</th>
        <th>Nombre de Tasses</th>
      </tr>
      <tr v-for="c in consommations" :key="c.consommationId">
        <td>{{ c.nomCompletProgrammeur }}</td>
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
      week: this.$route.params.week,
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
