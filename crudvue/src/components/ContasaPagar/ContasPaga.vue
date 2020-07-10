<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3">
        <h3>Listagem Contas a Pagar</h3>
        <router-link to="/formcontaapagar/0">
          <button class="btn btn-secondaty border border-gray float-left mb-3">
            <b-icon-plus></b-icon-plus>Novo Registro
          </button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Vencimento</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(it, index) in lstContas" :key="it._id">
            <th scope="row">{{ index }}</th>
            <td>{{ it.conta.categoria }}</td>
            <td>{{ it.conta.valorConta }}</td>
            <td>{{ dataFormatada(it.conta.dataVencimento) }}</td>
            <td>
              <button class="btn btn-sm btn-primary mr-1" @click="editContaAPagar(it._id)">
                <b-icon-pencil-square />
              </button>
              <button class="btn btn-sm btn-danger" @click="showDeleteConfirm(it._id)">
                <b-icon-trash-fill></b-icon-trash-fill>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
//import router from 'vue-router';
export default {
  name: "ContasPaga",
  data() {
    return {
      lstContas: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      axios.get("http://localhost:3000/listContasAPagar").then(response => {
      this.lstContas = response.data;
      console.log(response.data);
    });
    },
    dataFormatada(data) {
      return moment(data).format("DD/MM/YYYY");
    },
    editContaAPagar(id) {
      this.$router.push({ path: `/formcontaapagar/${id}`, params: {id: id} });
    },
    showDeleteConfirm(id) {
      this.$bvModal.msgBoxConfirm('Você deseja realmente excluir este registro?', {
        title: 'Confirmação',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Sim',
          cancelTitle: 'Não',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if(value == true)
              this.deleteConta(id);
          });

    },
    deleteConta(id){
      axios.delete(`http://localhost:3000/deleteContaAPagar/${id}`)
      .then(res => {
        console.log(res);
        this.getList();
      })
    }
  }
};
</script>
<style>
</style>