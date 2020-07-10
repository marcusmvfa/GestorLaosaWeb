<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3">
        <h3>Cadastro de Conta a Pagar</h3>
        <router-link to="/contaspagar">
          <button class="btn btn-secondaty border border-gray float-left mb-3" @click="clearForm()">
            <b-icon-plus></b-icon-plus>Voltar
          </button>
        </router-link>
      </div>
    </div>
    <div class="row border border-gray rounded">
      <div class="col-lg-12 pb-5">
        <div class="row">
          <div class="col-lg-1">
            <label for="idConta" class="control-label">#</label>
            <input
              type="text"
              name="codigo"
              id="idConta"
              class="form-control"
              placeholder="0000"
              v-model="conta.codigo"
              disabled
            />
          </div>
          <div class="col-lg-2">
            <label for="categoriaConta">Categoria de Conta</label>
            <select
              name="categoriaConta"
              id="categoriaConta"
              class="form-control"
              v-model="conta.categoria"
            >
              <option value="Material">Material</option>
              <option value="Administrativa">Administrativa</option>
              <option value="Pessoal">Pessoal</option>
            </select>
          </div>
          <div class="col-lg-2">
            <label for="valor" class="control-label">Valor</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">R$</span>
              </div>
              <input
                id="valor"
                type="text"
                class="form-control float-right"
                placeholder="50,00"
                v-model="conta.valorConta"
              />
            </div>
          </div>
          <div class="col-lg-2">
            <label for="vencimento" class="control-label">Data de Vencimento</label>
            <b-form-datepicker
              id="vencimento"
              placeholder
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric'}"
              locale="pt-BR"
              v-model="campoData"
            ></b-form-datepicker>
          </div>
          <div class="col-lg-2">
            <label class="label-control">Situação</label>
            <select class="form-control" v-model="conta.situacao">
              <option value="pen">Pendente</option>
              <option value="pag">Pago</option>
              <option value="can">Cancelado</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-5 mt-4">
            <button class="btn btn-primary float-left" type="button" @click="addParcelas()">
              <b-icon-plus />Parcelas
            </button>
            <!-- <div class="col-lg-7">
              <label for="parcelas" class="control-label">Parcelas</label>
              <div class="input-group">
                <input
                  id="parcelas"
                  type="number"
                  class="form-control"
                  value="0"
                  v-model="conta.numParcelas"
                />
                <div class="input-group-addon"></div>
              </div>
            </div>-->
            <div class="collapse" id="collapseExample" :class="{show: conta.parcelas.length > 0}">
              <table class="table mt-5">
                <tbody>
                  <tr v-for="(it, index) in conta.parcelas" :key="it.codigo">
                    <td>{{ index }}</td>
                    <td>{{ dataFormatada(it.vencimentoParcela) }}</td>
                    <td>
                      <b-dropdown :variant="getVariant(it.situacao)" no-caret>
                        <template v-slot:button-content>{{ it.situacao }}</template>
                        <b-dropdown-item @click="it.situacao = 'pen'">Pendente</b-dropdown-item>
                        <b-dropdown-item @click="it.situacao = 'pag'">Pago</b-dropdown-item>
                        <b-dropdown-item @click="it.situacao = 'can'">Cancelado</b-dropdown-item>
                      </b-dropdown>
                    </td>
                    <td>R$ {{ it.valor}}</td>
                    <td>
                      <button class="btn btn-sm btn-danger" @click="deleteParcela(index)">
                        <b-icon-trash-fill></b-icon-trash-fill>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-lg-5">
            <label for="descricao" class="control-label">Descrição</label>
            <textarea
              class="form-control"
              name="descricao"
              id="descricao"
              v-model="conta.descricao"
              cols="30"
              rows="10"
              placeholder="Descrição da Conta em quesatão..."
            ></textarea>
          </div>
        </div>
        <div class="row col-md-10 m-4">
          <div class="offset-lg-11 float-right">
            <router-link to="/contaspagar">
              <button class="btn btn-success" @click="salvarConta()">Salvar</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
import { isNullOrUndefined } from "util";
export default {
  name: "FormContaAPagar",
  data() {
    return {
      conta: {
        codigoConta: 0,
        categoria: "Material",
        descricao: "",
        valorConta: 0,
        dataVencimento: new Date(),
        //numParcelas: 0,
        parcelas: [],
        situacao: "pen"
      },
      id: "",
      campoData: ""
    };
  },
  mounted() {
    if (this.$route.params.id != 0) this.fetchData(this.$route.params.id);
  },
  methods: {
    fetchData(id) {
      axios.get(`http://localhost:3000/getContaAPagar/${id}`).then(response => {
        console.log(response.data);
        this.conta = response.data.conta;
        this.id = response.data._id;
        this.dataFormat();
      });
    },
    clearForm() {
      console.log("clear!!!!!");
    },
    addParcelas() {
      let data = new Date(this.campoData);
      if (this.conta.parcelas.length == 0) {
        data.setMonth(data.getMonth() + 1);
      } else {
        data.setMonth(
          this.conta.parcelas[this.conta.parcelas.length - 1].vencimentoParcela //Pega o mes do indice anterior do array
            .getMonth() + 1
        );
      }
      var valFormatado = parseFloat(
        this.conta.parcelas.length > 1
          ? this.conta.valorConta / this.conta.parcelas.length
          : this.conta.valorConta
      );

      this.conta.parcelas.push({
        valor: valFormatado.toFixed(2),
        situacao: "pen",
        vencimentoParcela: data
      });
      if (this.conta.parcelas.length > 0) this.atualizaParcelas();
    },
    deleteParcela(index) {
      var par = this.conta.parcelas[index];
      this.conta.parcelas.splice(index, 1);
      this.atualizaParcelas();
    },
    atualizaParcelas() {
      this.conta.parcelas.forEach(element => {
        element.valor =
          this.conta.parcelas.length > 1
            ? this.conta.valorConta / this.conta.parcelas.length
            : this.conta.valorConta;
      });
    },
    dataFormatada(data) {
      return moment(data).format("DD/MM/YYYY");
    },
    dataFormat() {
      this.campoData = moment(this.conta.dataVencimento).format("YYYY-MM-DD");
    },
    salvarConta() {
      this.conta.dataVencimento = new Date(this.campoData);
      if (this.id == null || this.id == undefined || this.id == "") {
        axios
          .post("http://localhost:3000/salvaConta", { conta: this.conta })
          .then(function(response) {
            console.log(response);
          });
      } else {
        axios
          .put(`http://localhost:3000/putContaAPagar/${this.id}`, {
            conta: this.conta
          })
          .then(function(response) {
            console.log(response);
          });
      }
    },
    getVariant(it) {
      if (it == "pen") return "warning";
      else if (it == "pag") return "success";
      else return "danger";
    }
  }
};
</script>
<style>
</style>