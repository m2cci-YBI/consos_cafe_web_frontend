<template>
  <div class="container">
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="nom">Nom</label>
          <div class="form-group">
            <input
              v-if="modeUpdate"
              type="text"
              id="nom"
              class="form-control"
              v-model="formData.nomCompletProgrammeur"
              readonly
            />
          </div>
          <select
            v-on:change="getProgrammeurId(formData.nomCompletProgrammeur)"
            class="form-control"
            id="nom"
            v-model="formData.nomCompletProgrammeur"
            v-if="!modeUpdate"
          >
            <option v-for="p in programmeurs" :key="p.programmeurId">
              {{ p.nom }} {{ p.prenom }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="week">Semaine</label>
          <input type="week" id="week" class="form-control" readonly v-model="week" />
        </div>
        <div class="form-group">
          <label for="nbrTasses">Nombre de Tasses</label>
          <input
            type="text"
            id="nbrTasses"
            class="form-control"
            v-model="formData.nbTasses"
            
          />
        </div>
        <br />
        <button class="btn btn-primary btn-block" type="submit">Submit</button>
        
      </form>
      
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      modeUpdate: "",
      programmeurs: [],
      week: "",
      weekInitial: "",
      formData: {
        consommationId: "",
        nbTasses: "",
        nomCompletProgrammeur: "",
        numSemaine: "",
        programmeur_Id: "",
      },
      jwtToken: "",
    };
  },
  mounted() {
    this.modeUpdate = this.$route.query.mode == "update";
    if (this.$route.query.mode == "update") {
      this.formData = this.$store.state.consommation[0];
      this.week = "2020-W" + this.formData.numSemaine;
      this.weekInitial = this.formData.numSemaine;
    } else {
      this.formData.consommationId = null;
      this.week = "2020-W" + this.$route.query.week;
      this.weekInitial = this.$route.query.week;
      this.formData.numSemaine = this.weekInitial;
    }
    console.log(this.formData);
    if (this.jwtToken == "") this.jwtToken = localStorage.getItem("jwtToken");
    axios
      .get("http://localhost:8081/programmeurs/", {
        headers: { Authorization: this.jwtToken },
      })
      .then((response) => {
        this.programmeurs = response.data;
        console.log(this.programmeurs);
        console.log(this.weekInitial);
        this.filterProgrammeurs(this.weekInitial);

        console.log(this.programmeurs);
      })
      .catch((error) => {
        console.log("erreur", error);
      });
  },
  methods: {
    
    
    filterProgrammeurs(week) {
      this.programmeurs = this.programmeurs.filter(
        (p) => p.consosCafe.filter((c) => c.numSemaine == week).length == 0
      );
    },
    getProgrammeurId(nomComplet) {
      let nom = nomComplet.slice(0, nomComplet.indexOf(" "));

      let id = this.programmeurs.filter((p) => p.nom == nom)[0].programmeurId;

      this.formData.programmeur_Id = id;
    },
    getWeek: function(date) {
      return date.slice(date.indexOf("W") + 1, date.length);
    },
    onSubmit() {
      if (this.jwtToken == "") this.jwtToken = localStorage.getItem("jwtToken");
      this.formData.numSemaine = this.getWeek(this.week);
      axios
        .post(
          "http://localhost:8081/consommations/",
          {
            numSemaine: this.formData.numSemaine,
            nbTasses: this.formData.nbTasses,
            consommationId: this.formData.consommationId,
            programmeur: {
              programmeurId: this.formData.programmeur_Id,
            },
          },
          {
            headers: { Authorization: this.jwtToken },
          }
        )
        .then((response) => {
          console.log(response);
          this.$router.replace(
            "/dashboard/consommations/" + this.weekInitial + "?isAjour=true"
          );
        })
        .catch((error) => {
          console.log("erreur", error);
          this.$router.replace("/signin");
        });
    },
  },
};
</script>

<style></style>
