<template>
  <div>
    <div class="row pt-3 pl-3">
      <div class="card card-soft-border">
        <div class="card-body">
          <h5 class="card-title">Quantidade de Pedidos</h5>
          <p class="card-text">7 Pedidos Pendentes  </p>
        </div>
      </div>
    </div>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <h2>Essential Links</h2>
      <ul>
        <li>
          <a href="https://vuejs.org" target="_blank">Core Docs</a>
        </li>
        <li>
          <a href="https://forum.vuejs.org" target="_blank">Forum</a>
        </li>
        <li>
          <a href="https://chat.vuejs.org" target="_blank">Community Chat</a>
        </li>
        <li>
          <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
        </li>
        <br />
        <li>
          <a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a>
        </li>
      </ul>
      <h2>Ecosystem</h2>
      <ul>
        <li>
          <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
        </li>
        <li>
          <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
        </li>
        <li>
          <a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a>
        </li>
        <li>
          <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
        </li>
        <li>
          <button v-on:click="greet">Call function</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    greet: function() {
      axios.get("http://localhost:3000/list").then(
        res => {
          debugger;
          console.log(res.data);
        },
        err => {
          alert("Não Funcionou!!!");
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.pt-3 {
  padding-top: 3rem !important;
}
.pl-3 {
  padding-left: 3rem !important;
}

.card-soft-border {
  border-radius: 8px;
}
</style>
