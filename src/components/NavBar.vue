<template>
  <nav class="navbar-light bg-light navbar-right">
    <button class="btn btn-outline-success" type="button">
      <router-link to="/" class="nav__link">Home</router-link>
    </button>
    <button class="btn btn-outline-success" type="button">
      <router-link to="/favorites" class="nav__link">Favourits</router-link>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .navbar-right {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      padding: .5rem 1rem;
  }

</style>
