<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"
        >APPLICATION WEB CAFE</router-link
      >
      <div class="collapase navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link
              to="/signin"
              class="nav-link"
              v-if="!this.$store.state.auth"
            >
              <f-icon icon="sign-in-alt" class="fa-lg mr-2" />Login
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/dashboard"
              class="nav-link"
              v-if="this.$store.state.auth"
            >
              <f-icon icon="cog" class="fa-lg mr-2" />Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/signin"
              class="nav-link"
              v-if="this.$store.state.auth"
            >
              <f-icon icon="sign-out-alt" class=" fa-lg mr-2" />Logout
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      auth: Boolean,
    };
  },
  mounted() {
    localStorage.getItem("jwtToken") == null
      ? (this.$store.state.auth = false)
      : (this.$store.state.auth = true);
  },
  methods: {},
};
</script>
<style>

</style>
