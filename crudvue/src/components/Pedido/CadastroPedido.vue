<template>
  <div id="formPedido" class="row px-4">
    <div class="row col-md-12 pt-1 border-bottom">
      <h1 class="pl-3">Cadastro de Pedido</h1>
    </div>
    <div class="container-fluid shadow p-3 mb-5 bg-white rounded">
      <div class="row">
        <div class="col-md-1 col-xs-3">
          <label for="codigo" class="float-left">Código</label>
          <input id="codigo" type="text" class="form-control" v-model="model.codigo" />
        </div>
        <div class="col-md-3 col-xs-3">
          <label for="nomePedido" class="float-left">Nome Pedido</label>
          <input id="nomePedido" type="text" class="form-control" v-model="model.nomePedido" />
        </div>
        <div class="col-md-3 col-xs-3">
          <label for="cliente" class="float-left">Cliente</label>
          <div class="input-group">
            <input id="cliente" type="text" class="form-control" v-model="model.nomeCliente" />
            <div class="btn-group">
              <button class="btn btn-primary">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </button>
              <button class="btn btn-danger">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <label for="obs" class="float-left">Obeservações</label>
          <textarea id="obs" type="text" class="form-control" v-model="model.observacoes"></textarea>
        </div>
      </div>
      <div class="row border-bottom">
        <div class="col-md-12 pl-3">
          <h3 class="float-left">Itens</h3>
        </div>
        <div class="col-md-12 pl-3">
          <div class="row pb-5">
            <button id="show-modal" class="btn btn-success float-left" v-on:click="showAlgo()">
              <font-awesome-icon :icon="['fas', 'plus']" />Adicionar Item
            </button>
          </div>
          <div class="row">
            <div
              class="collapse shadow col-md-8 offset-xs-0 offset-lg-1 border-item"
              v-bind:class="{'show': this.showItem == true, 'hide': this.showItem == false}"
            >
              <div class="row pt-1">
                <div class="form-group row col-md-4">
                  <label class="label-control float-left col-md-6">Tipo de Item</label>
                  <select class="custom-select col-md-6" v-model="item.tipoItem">
                    <option value="Sutia">Sutiã</option>
                    <option value="Calcinha">Calcinha</option>
                    <option value="Cueca">Cueca</option>
                    <option value="Maiô">Maiô</option>
                    <option value="Biquíni">Biquíni</option>
                    <option value="Camisola">Camisola</option>
                    <option value="Pijama">Pijama</option>
                  </select>
                </div>
                <div class="col-md-3 form-group row">
                  <label for="qtdItem" class="label-control float-left col-md-8">Quantidade:</label>
                  <input
                    id="qtdItem"
                    type="number"
                    class="form-control col-md-4"
                    v-model="item.qtd"
                  />
                </div>
                <div class="col-md-3 form-group row">
                  <label for="valorItem" class="label-control float-left col-md-6">Valor</label>
                  <input
                    id="valorItem"
                    type="number"
                    class="form-control col-md-6"
                    v-model="item.val"
                  />
                </div>
                <div class="col-md-3 form-group row">
                  <label for="flagRenda" class="label-control float-left col-md-6">Renda</label>
                  <input
                    id="valorItem"
                    type="checkbox"
                    class="form-control col-md-1"
                    v-model="item.renda"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 form-group row">
                  <label class="label-control float-left col-md-6">Tamanho Busto/Torax</label>
                  <select class="custom-select col-md-6" v-model="item.tamBusto">
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                    <option value="XG">XG</option>
                    <option value="XGG">XGG</option>
                  </select>
                  <label
                    for="tamBusto"
                    class="label-control float-left col-md-6"
                  >Tamanho Busto/Torax Extra:</label>
                  <input
                    id="tamBusto"
                    type="number"
                    class="form-control col-md-3"
                    v-model="item.tamBustoExtra"
                  />
                </div>
                <!-- <div class="col-md-2">
                </div>-->
                <div class="col-md-4 form-group row">
                  <label class="label-control float-left col-md-6">Tamanho Quadril</label>
                  <select class="custom-select col-md-6" v-model="item.tamQuadril">
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                    <option value="XG">XG</option>
                    <option value="XGG">XGG</option>
                  </select>
                  <label
                    for="tamQuadril"
                    class="label-control float-left col-md-6"
                  >Tamanho Quadril Extra:</label>
                  <input
                    id="tamQuadril"
                    type="number"
                    class="form-control col-md-3"
                    v-model="item.tamQuadril"
                  />
                </div>
                <div class="col-md-7 form-group row">
                  <label for="obsItem" class="label-control float-left col-md-3">Observacoes</label>
                  <textarea id="obsItem" class="form-control col-md-9" v-model="item.obs" />
                </div>
              </div>
              <div class="row float-right pr-4 pb-4">
                <button
                  type="button"
                  class="btn btn-success pull-rigth"
                  @click="salvarItem()"
                >Salvar</button>
              </div>
            </div>
          </div>
          <div class="py-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in model.listaItens" v-bind:key="item.id">
                  <th scope="row">{{ item.id }}</th>
                  <td>{{ item.tipoItem }}</td>
                  <td>{{ item.qtd }}</td>
                  <td>{{ item. obs }}</td>
                  <td>
                    <div class="btn-group">
                      <button class="btn btn-success">Edit</button>
                      <button class="btn btn-danger">Edit</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <router-link to="/pedidos">
          <button
            type="button"
            class="btn btn-success float-right pr-5 pb-5"
            @click="salvaPedido()"
          >Salvar Pedido</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "CadastroPedido",
  data() {
    return {
      model: {
        codigo: 0,
        nomePedido: "Teste",
        nomeCliente: "Marcus",
        observacoes: "dhsuadhusauh",
        listaItens: [{}]
      },
      showItem: false,
      item: {
        id: 0,
        val: 0,
        tipoItem: "Sutia",
        qtd: 0,
        renda: false,
        tamBusto: "P",
        tamQuadril: "P",
        tamBustoExtra: 0,
        tamQuadrilExtra: 0,
        obs: ""
      }
    };
  },
  methods: {
    showAlgo: function() {
      this.showItem = true;
    },
    salvarItem() {
      this.showItem = false;
      this.item.id = this.model.listaItens.length;
      this.model.listaItens.push(this.item);
      this.resetItem();
    },
    resetItem() {
      this.item = {
        val: 0,
        tipoItem: "Sutia",
        qtd: 0,
        renda: false,
        tamBusto: "P",
        tamQuadril: "P",
        tamBustoExtra: 0,
        tamQuadrilExtra: 0,
        obs: ""
      };
    },
    salvaPedido() {
      //console.log(JSON.stringify(Array.from(this.listaItens)));
      axios
        .post("http://localhost:3000/salvaPedido", { pedido: this.model })
        .then(function(response) {
          console.log(response);
        });
    }
  }
};
</script>
<style scoped>
.border-item {
  border-radius: 5px;
  border: 1px solid darkgray;
}
</style>