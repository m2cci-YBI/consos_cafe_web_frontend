<template>
  <div class="container">
    <div class="col-md-6 offset-md-3">
      <form action="">
        <div class="form-group">
          <label for="nom">Nom</label>
          <input type="text" id="nom" class="form-control" placeholder="" />
        </div>
        <div class="form-group">
          <label for="Prenom">Prenom</label>
          <input type="text" id="prenom" class="form-control" placeholder="" />
        </div>
        <div class="form-group">
          <label for="week">Semaine</label>
          <input type="week" id="week" class="form-control" placeholder="" />
        </div>
        <div class="form-group">
          <label for="nbrTasses">Nombre de Tasses</label>
          <input
            type="text"
            id="nbrTasses"
            class="form-control"
            placeholder=""
          />
        </div>
        <br />
        <button class="btn btn-primary btn-block" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      programmeur: {},
    };
  },
  mounted() {},
  method: {},
};
</script>

<style></style>
