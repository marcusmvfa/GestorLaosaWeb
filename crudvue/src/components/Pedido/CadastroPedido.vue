<template>
  <div id="formPedido" class="row">
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
              <b-button v-b-modal.modal-1 variant="success" @click="carregaClientes()">
                <font-awesome-icon :icon="['fas', 'plus']" />

              </b-button>
              <button class="btn btn-danger" @click="clearCliente()">
                <font-awesome-icon :icon="['fas', 'times']" />
              </button>
            </div>
          </div>
        </div>
        <div class="col-12">
          <b-modal id="modal-1" title="Listagem de Clientes">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Vendedora</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(it, index) in listClientes" :key="it.id" @click="selectCliente(it.cliente, it._id)">
                  <th scope="row">{{ index }}</th>
                  <td>{{ it.cliente.nomeCliente }}</td>
                  <td>{{ it.cliente.flagVendedora }}</td>
                </tr>
              </tbody>
            </table>
          </b-modal>
        </div>
        <div class="col-lg-2">
          <label for="vencimento" class="control-label">Data de Entrega</label>
          <b-form-datepicker
            id="vencimento"
            placeholder
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric'}"
            locale="pt-BR"
            v-model="model.campoData"
          ></b-form-datepicker>
        </div>
        <div class="col-md-5">
          <label for="obs" class="float-left">Obeservações</label>
          <textarea id="obs" type="text" class="form-control" v-model="model.observacoes"></textarea>
        </div>
      </div>
      <div class="row border-bottom">
        <div class="col-md-12 pl-lg-3 mt-3">
          <h3 class="float-left">Itens</h3>
        </div>
        <div class="col-md-12 pl-lg-3 col-12">
          <div class="row pb-3">
            <button id="show-modal" class="btn btn-success float-left mx-3" v-on:click="showAlgo()">
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
                  <label class="label-control float-left col-md-6 col-6">Tipo de Item</label>
                  <select class="custom-select col-md-6 col-6" v-model="item.tipoItem">
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
                  <label for="qtdItem" class="label-control float-left col-md-8 col-6">Quantidade:</label>
                  <input
                    id="qtdItem"
                    type="number"
                    class="form-control col-md-4 col-3"
                    v-model="item.qtd"
                  />
                </div>
                <div class="col-md-3 form-group row">
                  <label for="valorItem" class="label-control float-left col-md-6 col-6">Valor</label>
                  <input
                    id="valorItem"
                    type="number"
                    class="form-control col-md-6 col-4"
                    v-model="item.val"
                  />
                </div>
                <div class="col-md-3 form-group row">
                  <label for="flagRenda" class="label-control float-left col-md-6 col-6">Renda</label>
                  <input
                    id="flagRenda"
                    type="checkbox"
                    class="form-control col-md-1 col-1"
                    v-model="item.renda"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 form-group row">
                  <label class="label-control float-left col-md-6 col-6">Tamanho Busto/Torax</label>
                  <select class="custom-select col-md-6 col-4" v-model="item.tamBusto">
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                    <option value="XG">XG</option>
                    <option value="XGG">XGG</option>
                  </select>
                  <label
                    for="tamBusto"
                    class="label-control float-left col-md-6 col-6"
                  >Tamanho Busto/Torax Extra:</label>
                  <input
                    id="tamBusto"
                    type="number"
                    class="form-control col-md-3 col-3"
                    v-model="item.tamBustoExtra"
                  />
                </div>
                <div class="col-md-4 form-group row">
                  <label class="label-control float-left col-md-6 col-6">Tamanho Quadril</label>
                  <select class="custom-select col-md-6 col-4" v-model="item.tamQuadril">
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                    <option value="XG">XG</option>
                    <option value="XGG">XGG</option>
                  </select>
                  <label
                    for="tamQuadril"
                    class="label-control float-left col-md-6 col-6 mt-3"
                  >Tamanho Quadril Extra:</label>
                  <input
                    id="tamQuadril"
                    type="number"
                    class="form-control col-md-3 col-3 mt-3"
                    v-model="item.tamQuadrilExtra"
                  />
                </div>
                <div class="col-md-4 form-group row">
                  <label class="label-control float-left col-md-6 col-6">Situação</label>
                  <select class="custom-select col-md-6 col-4" v-model="item.situacao">
                    <option value="pen">Pendente</option>
                    <option value="fin">Finalizado</option>
                    <option value="can">Cancelado</option>
                  </select>
                </div>
                <div class="col-md-7 form-group row col-12">
                  <label for="obsItem" class="label-control float-left col-md-3 col-4">Observacoes</label>
                  <div class="col-12">
                    <textarea id="obsItem" class="form-control col-md-9 col-12" v-model="item.obs" />
                  </div>
                </div>
              </div>
              <div class="row float-right pr-4 pb-4">
                <button
                  type="button"
                  class="btn btn-success pull-rigth"
                  @click="salvarItem(item.id)"
                >Salvar</button>
              </div>
            </div>
          </div>
          <div class="py-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Qtd.</th>
                  <th scope="col">Situação</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in model.listaItens" v-bind:key="item.id">
                  <td scope="row">{{ index }}</td>
                  <td>{{ item.tipoItem }}</td>
                  <td>{{ item.qtd }}</td>
                  <td>
                    <span
                      class="badge"
                      v-bind:class="{'badge-success': item.situacao == 'fin',
                       'badge-warning': item.situacao == 'pen',
                        'badge-danger': item.situacao == 'can'}"
                    >{{ item.situacao }}</span>
                  </td>
                  <td>
                    <div class="btn-group">
                      <button class="btn btn-success" @click="showAlgo(item.id)">
                        <font-awesome-icon :icon="['fas','edit']" />
                      </button>
                      <button class="btn btn-danger" @click="deleteItem(item.id)">
                        <font-awesome-icon :icon="['fas','trash']" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2 col-7">
          <router-link to="/pedidos">
            <button
              type="button"
              class="btn btn-success float-left ml-3 mt-3"
              @click="salvaPedido()"
            >Salvar Pedido</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ListClientes from "../Cliente/ListCliente";
export default {
  name: "CadastroPedido",
  data() {
    return {
      showModal: false,
      listClientes: [],
      cliente: {},
      model: {
        codigo: 0,
        nomePedido: "Teste",
        nomeCliente: "Marcus",
        observacoes: "dhsuadhusauh",
        listaItens: [],
        campoData: ""
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
        situacao: "pen",
        obs: ""
      },
      id: ""
    };
  },
  mounted() {
    if (this.$route.params.id != 0 && this.$route.params.id != undefined)
      this.getPedidoById(this.$route.params.id);
  },
  methods: {
    showAlgo: function(id) {
      this.showItem = !this.showItem;
      if (id != undefined) {
        console.log(id);
        this.item = this.model.listaItens.find(el => el.id == id);
      }
      if(this.cliente.flagVendedora == false){
        this.item.tamBusto = this.cliente.campoBusto;
        this.item.tamBustoExtra = this.cliente.campoBustoExtra;
        this.item.tamQuadril = this.cliente.campoQuadril;
        this.item.tamQuadrilExtra = this.cliente.campoQuadrilExtra;
      }
    },
    salvarItem(id) {
      this.showItem = false;
      if (id == 0 || id == undefined) {
        this.item.id = this.model.listaItens.length + 1;
        this.model.listaItens.push(this.item);
      } else {
        this.model.listaItens.forEach(element => {
          if (element.id == id) {
            element = this.item;
          }
        });
        //this.model.listaItens.find(el => el.id == id) = this.item;
      }
      this.resetItem();
    },
    deleteItem(id) {
      this.model.listaItens = this.model.listaItens.filter(it => it.id != id);
      function logArrayElements(element, index, array) {
        element.id = index + 1;
        debugger;
      }
      this.model.listaItens.forEach(logArrayElements);
    },
    resetItem() {
      this.item = {
        id: 0,
        val: 0,
        tipoItem: "Sutia",
        qtd: 0,
        renda: false,
        tamBusto: "P",
        tamQuadril: "P",
        tamBustoExtra: 0,
        tamQuadrilExtra: 0,
        situacao: "pen",
        obs: ""
      };
    },
    salvaPedido() {
      //console.log(JSON.stringify(Array.from(this.listaItens)));
      if (this.id == null || this.id == undefined || this.id == "") {
        axios
          .post("http://" + window.location.hostname + ":3000/salvaPedido", {
            pedido: this.model
          })
          .then(function(response) {
            console.log(response);
          });

        this.$router.push("pedidos");
      } else {
        axios
          .put(
            `http://` +
              window.location.hostname +
              `:3000/EditPedido/${this.id}`,
            { pedido: this.model }
          )
          .then(function(response) {
            console.log(response);
          });

        this.$router.push("pedidos");
      }
      this.id = "";
    },
    getPedidoById(id) {
      axios
        .get(`http://` + window.location.hostname + `:3000/getPedidoById/${id}`)
        .then(response => {
          console.log(response);
          this.model = response.data.pedido;
          this.id = response.data._id;
        });
    },
    carregaClientes(){
      axios.get('http://' + window.location.hostname + ':3000/getAllClientes')
      .then(response => {
        this.listClientes = response.data;
      });
    },
    selectCliente(cliente, id) {
      this.cliente = cliente;
      this.model.nomeCliente = cliente.nomeCliente;
      this.model.idCliente = id;
      this.$bvModal.hide('modal-1');
    },
    clearCliente() {
      this.cliente = {};
      this.model.nomeCliente = "";
      this.model.idCliente = ""
    }
  }
};
</script>
<style scoped>
.border-item {
  border-radius: 5px;
  border: 1px solid darkgray;
}
@media screen and (min-width: 900px) {
  .pl-lg-3 {
    padding-left: 3rem !important;
  }
}
</style>