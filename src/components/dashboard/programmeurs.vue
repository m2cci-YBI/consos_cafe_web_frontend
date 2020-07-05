<template>
  <div class="row">
    <div class="col-3 mb-3" v-for="p in programmeurs" :key="p.programmeurId">
      <div class="card">
        <div class="card-body">
          <img src="../../assets/dev.png" class=" w-50 " alt="" />
          <h6>{{ p.nom }} {{ p.prenom }}</h6>
          <p>Bureau : {{p.numbureau}}</p>
          <div
            class="float-right"
            v-on:click="deleteProg(p.programmeurId)"
            style="cursor:pointer"
            v-if="!p.roles.includes('RESP')"
          >
            <f-icon icon="trash" class="fa-lg "></f-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      programmeurs: [],
      jwtToken: "",
    };
  },
  mounted() {
    
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
   
    deleteProg: function(id) {
       console.log(this.programmeurs)
      axios
        .delete("http://localhost:8081/programmeurs/" + id, {
          headers: { Authorization: this.jwtToken },
        })
        .then((response) => {
          console.log(response.data);
          this.programmeurs = this.programmeurs.filter(
            (p) => p.programmeurId != id
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
