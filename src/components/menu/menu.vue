<template>
  <div class="col-md-3 pl-0 sticky" v-if="isResp">
    <div
      class="card text-center bg-primary text-white "
      style="border-radius:0px"
    >
      <div class="card-body">
        <h3>Programmeurs</h3>
        <div>
          <f-icon icon="users" class="fa-3x"></f-icon>
        </div>
        <br />
        <router-link to="/dashboard" class="btn btn-outline-light btn-sm"
          >Voir</router-link
        >
      </div>
    </div>
    <div
      class="card text-center bg-secondary text-white "
      style="border-radius:0px"
    >
      <div class="card-body">
        <h3>Consommations</h3>
        <div>
          <f-icon icon="coffee" class="fa-3x"></f-icon>
        </div>
        <br />
        <router-link
          to="/dashboard/choixAffichage"
          class="btn btn-outline-light btn-sm"
          >Voir</router-link
        >
      </div>
    </div>
    <div
      class="card text-center bg-success text-white  "
      style="border-radius:0px"
    >
      <div class="card-body">
        <h3>Notifications</h3>
        <div>
          <f-icon icon="bell" class="fa-3x"></f-icon>
        </div>
        <br />
        <router-link to="" class="btn btn-outline-light btn-sm"
          >Voir</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  isResp: this.$store.state.isResp,
};
</script>

<style>
h3 {
  text-align: center;
  font-family: Times New Roman;
}
</style>
