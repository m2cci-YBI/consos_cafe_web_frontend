<template>
  <div class="filter-Form">
    <form @submit.prevent="onSubmit">
      <div class="input">
        Week : <input id="numSemInput" type="week" v-model="week" />

        <br /><br />

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

      <br /><br />
      <div class="submit">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
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
      if (this.jwtToken == "") this.jwtToken = localStorage.getItem("jwtToken");
      axios
        .get("http://localhost:8081/monPdf", {
          responseType: "blob",
          headers: {
            Authorization: this.jwtToken,
          },
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const objectUrl = window.URL.createObjectURL(blob);
          window.open(objectUrl);
        })

        .catch((error) => {
          console.log(error);
        });
    },

    onSubmit() {
      const formData = {
        week: this.week,
        format: this.format,
      };
      this.format == "PDF"
        ? this.afficherPdf()
        : this.$router.push("consommations/" + this.getWeek(this.week));
      console.log(formData);
    },
  },
};
</script>

<style>
.filter-Form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
  color: #4e4e4e;
}

#numSemInput {
  font-size: large;
  color: #4e4e4e;
  height: 30px;
  font-style: inherit;
}

.submit button {
  border: 1px solid #002fff;
  color: #002fff;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #002fff;
  color: white;
}
</style>
