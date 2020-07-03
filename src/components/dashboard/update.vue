<template>
  <div class="container">
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="nom">Nom</label>
          <select v-on:change="getProgrammeurId(formData.nomCompletProgrammeur)"
           
            class="form-control"
            id="nom"
            v-model="formData.nomCompletProgrammeur"
            
          >
            <option v-for="p in programmeurs" :key="p.programmeurId" >
              {{ p.nom }} {{ p.prenom }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="week">Semaine</label>
          <input type="week" id="week" class="form-control" v-model="week" />
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
    
    if (this.$route.query.mode == "update") {
      this.formData = this.$store.state.consommation[0];
      this.week = "2020-W" + this.formData.numSemaine;
      this.weekInitial = this.formData.numSemaine;
     // document.getElementById("nom").setAttribute("readonly", "true");
      
    } else {
      this.formData.consommationId = null;
      this.week = "2020-W" + this.$route.query.week;
      this.weekInitial = this.$route.query.week;
      this.formData.numSemaine=this.weekInitial
      document.getElementById("week").setAttribute("readonly", "true");
    }
    console.log(this.formData);
    if (this.jwtToken == "") this.jwtToken = localStorage.getItem("jwtToken");
    axios
      .get("http://localhost:8081/programmeurs/", {
        headers: { Authorization: this.jwtToken },
      })
      .then((response) => {
        this.programmeurs = response.data;
      })
      .catch((error) => {
        console.log("erreur", error);
      });
  },
  methods: {
    getProgrammeurId(nomComplet){
      let nom=nomComplet.slice(0,nomComplet.indexOf(" "));
      console.log(nom);
      let id=this.programmeurs.filter((p)=>p.nom==nom)[0].programmeurId
      console.log(id);
      this.formData.programmeur_Id=id;
      console.log(this.formData)
    }
    ,
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
          this.$router.replace("/dashboard/consommations/" + this.weekInitial);
        })
        .catch((error) => {
          console.log("erreur", error);
        });
    },
  },
};
</script>

<style></style>
