<template>
  <div class="container">
    <br>
    
    <div
      v-if="fauxId"
      class="alert alert-danger"
      style="margin-top: 10px ;text-align: center"
    >
      <strong>Username ou password erroné</strong>
    </div>

    <div class="col-md-4 offset-4">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="username" id="username" class="form-control" v-model="username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" class="form-control" v-model="password" />
        </div>
        <br />
        <button class="btn btn-primary btn-block" type="submit">Submit</button>
      </form>
    </div>
  </div>
 
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      fauxId: false,
    };
  },
  mounted() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("vuex");
    this.$store.commit('setConsommation',null);
    this.$store.commit('setAuth', false);
    this.$store.commit('setRoles', []);
    this.$store.commit('setIsResp',false);
    
  },
  methods: {
    checkRoles() {
      let roles = this.$store.state.roles;

      for (let r of roles) {
        if (r.authority == "RESP") {
          this.$store.commit('setIsResp',true);

          return;
        }
      }
      this.$store.commit('setIsResp',false);
    },
    onSubmit() {
      const formData = {
        username: this.username,
        password: this.password,
      };
      axios
        .post("http://localhost:8081/login", formData)
        .then((response) => {
          let jwtToken = response.headers.authorization;
          localStorage.setItem("jwtToken", jwtToken);
          console.log(jwtToken);
          let jwtTokenModified = jwtToken.slice(
            jwtToken.indexOf(" ") + 1,
            jwtToken.length
          );
          console.log(jwtTokenModified);
          let decodedJwt = VueJwtDecode.decode(jwtTokenModified);
          console.log(decodedJwt);
          this.$store.commit('setRoles', decodedJwt.authorities);
          this.$store.commit('setAuth', true);
          this.checkRoles();
          this.$router.push("dashboard");
          
                  })
        .catch((error) => {
          this.fauxId = true;
          console.log(error);
        });
    },
  },
};
</script>

<style >

</style>
