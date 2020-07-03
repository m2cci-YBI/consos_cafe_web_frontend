<template>
  <div class="container">
    <div
      v-if="fauxId"
      class="alert alert-danger"
      style="margin-top: 10px ;text-align: center"
    >
      <strong>Username ou password erroné</strong>
    </div>
    <div id="signin">
      <div class="signin-form">
        <form @submit.prevent="onSubmit">
          <div class="input">
            <label for="username">Username</label>
            <input type="username" id="username" v-model="username" />
          </div>
          <div class="input">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" />
          </div>
          <div class="submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'

import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      fauxId: false,
    };
  },
  methods: {
    checkRoles(){
      let roles=this.$store.state.roles
      console.log( roles)
      console.log("avant iteration")
      for(let r of roles)
      { console.log("debut iteration")
        if (r.authority=="RESP") {
          this.$store.state.isResp=true;
          console.log("ici")
          console.log(r.authority)

          console.log(this.$store.state.isResp)
          return

        }
        
      }
      this.$store.state.isResp=false;
      

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
          let jwtTokenModified=jwtToken.slice(jwtToken.indexOf(" ")+1, jwtToken.length);
          console.log(jwtTokenModified);
          let decodedJwt=VueJwtDecode.decode(jwtTokenModified)
          console.log(decodedJwt);
          this.$store.state.roles=decodedJwt.authorities        
          this.$store.state.auth = true;
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

<style scoped>
.signin-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input input:focus {
  outline: none;
  border: 1px solid #002fff;
  background-color: #eee;
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

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>
