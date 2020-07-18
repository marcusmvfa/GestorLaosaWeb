<template >
    <div class="container-fluid">
        <div class="row">
      <div class="col-lg-3">
        <h3>Listagem Estoque</h3>
        <router-link to="/formestoque/0">
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
            <th scope="col">Tipo</th>
            <th scope="col">Qtd.</th>
            <th scope="col">Disponível</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(it, index) in lstItens" :key="it._id">
            <th scope="row">{{ index }}</th>
            <td>{{ it.item.tipo }}</td>
            <td>{{ it.item.qtd }}</td>
            <td>{{ it.item.disponibilidade }}</td>
            <td>
              <button class="btn btn-sm btn-primary mr-1" @click="editItemEstoque(it._id)">
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
export default {
    name: "listEstoque",
  data() {
    return {
      lstItens: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      axios.get("http://"+ window.location.hostname + ":3000/getAllEstoque").then(response => {
      this.lstItens = response.data;
    });
    },
    dataFormatada(data) {
      return moment(data).format("DD/MM/YYYY");
    },
    editItemEstoque(id) {
      this.$router.push({ path: `/formEstoque/${id}`, params: {id: id} });
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
              this.deleteItemEstoque(id);
          });

    },
    deleteItemEstoque(id){
      axios.delete(`http://`+ window.location.hostname +`:3000/deleteItemEstoque/${id}`)
      .then(res => {
        this.getList();
      })
    }
  }
}
</script>
<style scoped>

</style>