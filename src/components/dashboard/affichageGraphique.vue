<template>
  <div class="container">
    <canvas id="monChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import axios from "axios";
export default {
  data() {
    return {
      jwtToken: "",

      chartData: {
        labels: [],
        datasets: [
          {
            label: "Consommations Totales Des Programmeurs",
            data: [],
            backgroundColor: "gray",
          },
        ],
      },
    };
  },
  mounted() {
    this.getProgrammeurs();

    this.creerChart("monChart", this.chartData);
  },
  methods: {
    getProgrammeurs() {
      if (this.jwtToken == "") this.jwtToken = localStorage.getItem("jwtToken");
      axios
        .get("http://localhost:8081/programmeurs/", {
          headers: { Authorization: this.jwtToken },
        })
        .then((response) => {
          console.log(response.data);
          this.creerChartData(response.data);
          this.creerChart("monChart", this.chartData);
        })
        .catch((error) => {
          console.log("erreur", error);
        });
    },
    creerChartData(programmeurs) {
      programmeurs.forEach((p) => {
        this.chartData.labels.push(p.nom);
        this.chartData.datasets[0].data.push(
          p.consosCafe
            .map((c) => c.nbTasses)
            .reduce((total, valeur) => total + valeur)
        );
      });
    },
    creerChart(id, chartData) {
      const monChart = document.getElementById(id).getContext("2d");
      const EvolutionConsommation = new Chart(monChart, {
        type: "bar",
        data: chartData,
        options: {
          legend: {
            labels: {
              fontSize: 20,
              fontFamily:"Lato"
            },
            fontSize: 25,
          },
        },
      });
      console.log(EvolutionConsommation);
    },
  },
};
</script>

<style></style>
