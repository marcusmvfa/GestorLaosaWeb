<template>
  <div class="row">
    <div class="row col-md-12 pt-1 border-bottom">
      <h1 class="pl-3">Lista de Clientes</h1>
    </div>
    <div class="row col-md-12 pt-1 pl-3">
      <router-link to="/formCliente/0">
        <button class="btn btn-outline-primary">Novo Cliente</button>
      </router-link>
    </div>
    <div class="col-md-12 pt-1">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Fone</th>
              <th scope="col">Vendedora</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(it,index) in listaClientes" :key="it.id">
              <th scope="row">{{ index }}</th>
              <td>{{ it.cliente.nomeCliente }}</td>
              <td>{{ it.cliente.foneCliente }}</td>
              <td>{{ it.cliente.flagVendedora }}</td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-success" @click="getClienteById(it._id)">Edit</button>
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
  name: "ListCliente",
data() {
    return {
      listaClientes: [
        {
          id: "",
          cliente: {}
        }
      ]
    };
  },
  mounted() {
    this.getAllClientes();
  },
  methods: {
    getAllClientes() {
      axios.get("http://" + window.location.hostname + ":3000/getAllClientes").then(response => {
        this.listaClientes = response.data;
        console.log(this.listaClientes);
      });
    },
    getClienteById(id) {
      this.$router.push({ path: `/formCliente/${id}`, params: { id: id } });
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
          if (value == true) this.deleteCliente(id);
        });
    },
    deleteCliente(id) {
      axios.delete(`http://` + window.location.hostname + `:3000/deleteCliente/${id}`).then(res => {
        this.getAllClientes();
      });
    },
    dataFormatada(data) {
      return moment(data).format("DD/MM/YYYY");
    }
  }
}
</script>

<style>

</style>