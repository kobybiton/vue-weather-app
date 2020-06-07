<template>
  <nav class="navbar-light bg-light navbar-right">
    <router-link to="/" class="nav__link">
      <button class="btn btn-primary" type="button">
        Home
      </button>
    </router-link>
    <router-link to="/favorites" class="nav__link">
      <button class="btn btn-info" type="button">
        Favorites
      </button>
    </router-link>
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
<style lang="scss">

  .navbar-right {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    padding: .5rem 1rem;
  }

  .nav__link {
    color: #fff;
    text-decoration: none;
    &:hover {
      color: #fafafa;
      text-decoration: none;
    }
  }

  .btn {
    border-radius: 0 !important;
  }

</style>
