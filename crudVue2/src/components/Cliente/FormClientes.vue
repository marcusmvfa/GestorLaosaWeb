<template>
  <div id="formPedido" class="row px-4">
    <div class="row col-md-12 pt-1 border-bottom">
      <h1 class="pl-3">Cadastro de Cliente</h1>
    </div>
    <div class="container-fluid shadow p-3 mb-5 bg-white rounded">
      <div class="row">
        <div class="col-md-1 col-xs-3">
          <label for="codigo" class="float-left">Código</label>
          <input id="codigo" type="text" class="form-control" v-model="model.codigo" />
        </div>
        <div class="col-md-3 col-xs-3">
          <label for="nomePedido" class="float-left">Nome Cliente</label>
          <input id="nomePedido" type="text" class="form-control" v-model="model.nomeCliente" />
        </div>
        <div class="col-md-2 col-xs-3">
          <label for="cliente" class="float-left">Número</label>
          <input id="cliente" type="text" class="form-control" v-model="model.foneCliente" />
        </div>
        <div class="col-lg-1 mt-3-mobile">
          <label for="vencimento" class="control-label">Vendedora?</label>
          <div class="btn-group">
            <button
              class="btn"
              @click="flagVendedora()"
              v-bind:class="{'btn-success' : model.flagVendedora == true, 'btn-secondary' : model.flagVendedora == false}"
            >Sim</button>
            <button
              class="btn"
              @click="flagVendedora()"
              v-bind:class="{'btn-danger' : model.flagVendedora == false, 'btn-secondary' : model.flagVendedora == true}"
            >Não</button>
          </div>
        </div>
      </div>
      <div class="row mt-3" v-if="!model.flagVendedora">
        <div class="col-md-6 bg-white rounded border pxoff-3-mobile pb-3">
          <div class="col-md-8 col-12">
            <div class="col-md-6 col-12 mt-3 float-left">
              <label for="campoBusto" class="control-label float-left col-md-6 col-6">Busto/Torax</label>
              <div class="col-md-6 col-6 float-right">
                <select class="form-control" v-model="model.campoBusto">
                  <option value="P">P</option>
                  <option value="M">M</option>
                  <option value="G">G</option>
                  <option value="GG">GG</option>
                  <option value="XG">XG</option>
                  <option value="XGG">XGG</option>
                </select>
              </div>
            </div>
            <div class="col-md-6 col-12 mt-3 float-right">
              <label for="campoBustoExtra" class="control-label float-left col-md-3 col-6">Extra</label>
              <div class="col-md-6 col-6 float-right mr-lg-50 mb-3">
                <input type="number" class="form-control" v-model="model.campoBustoExtra" />
              </div>
            </div>
          </div>
          <div class="col-md-4"></div>
          <div class="col-md-6 col-12 form-group row mt-3">
            <label class="label-control float-left col-md-6 col-7">Tamanho Quadril</label>
            <div class="col-5">
              <select class="custom-select col-md-6 col-12" v-model="model.campoQuadril">
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
                <option value="XG">XG</option>
                <option value="XGG">XGG</option>
              </select>
            </div>
            <label
              for="tamQuadril"
              class="label-control float-left col-md-6 col-7 pt-3"
            >Tamanho Quadril Extra:</label>
            <div class="col-5 pb-3 mt-3">
              <input
                id="tamQuadril"
                type="number"
                class="form-control col-md-3 col-12"
                v-model="model.campoQuadrilExtra"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row pb-3">
        <div class="col-md-5">
          <label for="obs" class="float-left">Obeservações</label>
          <textarea id="obs" type="text" class="form-control" v-model="model.observacoes"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mx-auto">
          <router-link to="/clientes">
            <div class="mx-auto">
              <button
                type="button"
                class="btn btn-success float-right"
                @click="salvaCliente()"
              >Salvar Cliente</button>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      item: {},
      model: {
        flagVendedora: false
      }
    };
  },
  mounted() {
    if(this.$route.params.id != 0 && this.$route.params.id != undefined)
      this.getPedidoById(this.$route.params.id)
  },
  methods: {
    flagVendedora() {
      this.model.flagVendedora = !this.model.flagVendedora;
    },
    salvaCliente() {
      if (this.id == null || this.id == undefined || this.id == "") {
        axios
          .post("http://" + window.location.hostname + ":3000/salvaCliente", {
            cliente: this.model
          })
          .catch(function(response) {
            console.log(response);
          })
          .then(function(response) {
            console.log(response);
            this.$router.push("clientes");
          });
      } else {
        axios
          .put(
            `http://` +
              window.location.hostname +
              `:3000/EditCliente/${this.id}`,
            { cliente: this.model }
          )
          .then(function(response) {
            console.log(response);
            this.$router.push("clientes");
          });
      }
      this.id = "";
    },
    getPedidoById(id) {
      axios
        .get(
          `http://` + window.location.hostname + `:3000/getClienteById/${id}`
        )
        .then(response => {
          console.log(response);
          this.model = response.data.cliente;
          this.id = response.data._id;
        });
    },
  }
};
</script>

<style>
@media screen and (max-width: 500px) {
  .mt-3-mobile {
    margin-top: 15px;
  }
  .pxoff-3-mobile {
    padding-right: 0px !important;
    padding-left: 0px !important;
  }
}
@media screen and (min-width: 1100px) {
  .mr-lg-50 {
    margin-right: 50px;
  }
}
</style>