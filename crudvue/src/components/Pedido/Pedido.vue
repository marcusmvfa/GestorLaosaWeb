<template>
  <div class="row">
    <div class="row col-md-12 pt-1 border-bottom">
      <h1 class="pl-3">Lista de Pedidos</h1>
    </div>
    <div class="row col-md-12 pt-1 pl-3">
      <router-link to="/pedidoform/0">
        <button class="btn btn-outline-primary">Novo Pedido</button>
      </router-link>
    </div>
    <div class="col-md-12 pt-1">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Pedido</th>
              <th scope="col">Cliente</th>
              <th scope="col">Data</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(it,index) in listaPedidos" :key="it.id">
              <th scope="row">{{ index }}</th>
              <td>{{ it.pedido.nomePedido }}</td>
              <td>{{ it.pedido.nomeCliente }}</td>
              <td>{{ dataFormatada(it.pedido.campoData) }}</td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-success" @click="getPedidoById(it._id)">Edit</button>
                  <button class="btn btn-danger" @click="showDeleteConfirm(it._id)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      listaPedidos: [
        {
          id: "",
          pedido: {}
        }
      ]
    };
  },
  mounted() {
    this.getAllPedidos();
  },
  methods: {
    getAllPedidos() {
      axios.get("http://" + window.location.hostname + ":3000/getAllPedidos").then(response => {
        this.listaPedidos = response.data;
        console.log(this.listaPedidos);
      });
    },
    getPedidoById(id) {
      this.$router.push({ path: `/pedidoform/${id}`, params: { id: id } });
      // this.$router.push({ path: `/formcontaapagar/${id}`, params: {id: id} });
    },
    showDeleteConfirm(id) {
      this.$bvModal
        .msgBoxConfirm("Você deseja realmente excluir este registro?", {
          title: "Confirmação",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Sim",
          cancelTitle: "Não",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value == true) this.deletePedido(id);
        });
    },
    deletePedido(id) {
      axios.delete(`http://localhost:3000/deletePedido/${id}`).then(res => {
        this.getAllPedidos();
      });
    },
    dataFormatada(data) {
      return moment(data).format("DD/MM/YYYY");
    }
  }
};
</script>
<style scoped>
.border-bottom {
  border-bottom: 1px solid #dee2e6 !important;
}
</style>