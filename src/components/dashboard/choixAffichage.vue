<template>
  <div class="container ">
    <div class="col-md-6 offset-md-3">
      <div
        v-if="ressourceIndispo"
        class="alert alert-danger"
        style="margin-top: 10px ;text-align: center"
      >
        <strong>Cette Semaine ne contient aucune Consommation</strong>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="week">Semaine</label>
          <input id="week" class="form-control" type="week" v-model="week" />
        </div>

        <div class="form-group">
          Format : HTML
          <input
            type="radio"
            v-model="format"
            name="format"
            checked
            value="HTML"
          />

          PDF
          <input type="radio" v-model="format" name="format" value="PDF" />
        </div>

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
      ressourceIndispo: false,
      week: "",
      format: "",
      jwtToken: "",
    };
  },
  methods: {
    getWeek: function(date) {
      return date.slice(date.indexOf("W") + 1, date.length);
    },
    afficherPdf() {
      this.ressourceIndispo = false;
      console.log(this.getWeek(this.week));
      if (this.jwtToken == "") this.jwtToken = localStorage.getItem("jwtToken");
      axios
        .get("http://localhost:8081/monPdf/" + this.getWeek(this.week), {
          responseType: "blob",
          headers: {
            Authorization: this.jwtToken,
            Accept: "application/pdf",
          },
        })
        .then((response) => {
          console.log(response);
          const blob = new Blob([response.data], { type: "application/pdf" });
          const Url = window.URL.createObjectURL(blob);
          window.open(Url);
        })

        .catch((error) => {
          if (error.response.status == 500) this.ressourceIndispo = true;
          else if (error.response.status == 403)
            this.$router.replace("/signin");
          else console.log(error);
        });
    },

    onSubmit() {
      this.format == "PDF"
        ? this.afficherPdf()
        : this.$router.push({
            name: "consommations",
            params: { week: this.getWeek(this.week) },
          });
    },
  },
};
</script>

<style></style>
