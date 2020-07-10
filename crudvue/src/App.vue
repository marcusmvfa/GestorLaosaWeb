<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-md-2">
        <nav class="d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <img src="./assets/logo.png" />
            <ul class="nav flex-column">
              <router-link to="/pedidos">
                <li class="nav-item">Pedidos</li>
              </router-link>
              <router-link to="/contaspagar">
                <li class="nav-item">Contas a Pagar</li>
              </router-link>
              <router-link to="/Clientes">
                <li class="nav-item">Clientes</li>
              </router-link>
              <li class="nav-item"></li>
            </ul>
          </div>
        </nav>
        <nav class="d-xs-block d-sm-block navbar navbar-light bg-light mx-15">
          <a class="navbar-brand" href="#">Navbar</a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            @click="toggleNav()"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-collapse" id="navbarSupportedContent" v-show="showHamburguer">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <router-link to="/pedidos">
                  <a class="dropdown-item">Pedidos</a>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/contaspagar">
                  <a class="nav-item">Contas a Pagar</a>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/clientes">
                  <a class="nav-item">Clientes</a>
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="col-md-10 background-app">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showHamburguer: false
    };
  },
  methods: {
    toggleNav() {
      this.showHamburguer = !this.showHamburguer;
    }
  }
};
</script>


<style>
@media only screen and (min-width: 900px) {
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
}
@media only screen and (max-width: 600px) {
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
}
.sidebar-sticky {
  position: -webkit-sticky;
  position: sticky;
}
.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
}
.px-4 {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}
.pt-1 {
  padding-top: 1rem !important;
}
.pl-3 {
  padding-left: 3rem !important;
}
.mx-15 {
  margin-left: -15px !important;
  margin-right: -15px !important;
}
</style>
