<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
          <img src="./assets/logo.png" />
          <ul class="nav flex-column">
            <router-link to="/pedidos">
              <li class="nav-item">Pedidos</li>
            </router-link>
            <router-link to="/contaspagar">
            <li class="nav-item">Contas a Pagar</li>
            </router-link>
            <li class="nav-item"></li>
            <li class="nav-item"></li>
          </ul>
        </div>
      </nav>
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
    };
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.background-app {
  background: #f5f4f2;
}
.sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
}
.sidebar-sticky {
  position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: .5rem;
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
</style>
