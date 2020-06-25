<template>
  <header id="header">
    <div class="header">
      <router-link to="/">APPLICATION WEB CAFE</router-link>
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/signin">Sign In</router-link>
        </li>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <button @click="logOut" class="logOut">LogOut</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logOut() {
      localStorage.removeItem("jwtToken");
      this.$router.replace("/signin");
    },
  },
};
</script>
<style>
#header {
  height: 56px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  background-color: #002fff;
  padding: 0 20px;
}

.logOut {
  background-color: transparent;
  border: none;
  font: inherit;
  color: white;
  cursor: pointer;
}
.header a {
  text-decoration: none;
  font-family: inherit;
  color: white;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
}

li {
  margin: 0 16px;
}

li a {
  text-decoration: none;
  color: white;
}

li a:hover,
li a.router-link-active {
  color: #fa923f;
}
</style>
