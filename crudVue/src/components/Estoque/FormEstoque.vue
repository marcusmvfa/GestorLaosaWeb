<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="col-lg-3 float-left">
          <h3>Cadastro de Estoque</h3>
          <router-link to="/listEstoque">
            <button
              class="btn btn-secondaty border border-gray float-left mb-3"
              @click="clearForm()"
            >
              <b-icon-arrow90deg-left></b-icon-arrow90deg-left>Voltar
            </button>
          </router-link>
        </div>
        <div class="col-lg-3 col-12 float-right mt-3 mb-3">
          <label for="idConta" class="control-label">#</label>
          <input
            type="text"
            name="codigo"
            id="idConta"
            class="form-control"
            placeholder="0000"
            v-model="id"
            disabled
          />
        </div>
      </div>
    </div>
    <div class="row border border-gray rounded">
      <div class="col-lg-12 pb-5">
        <div class="row mt-3">
          <div class="col-lg-2 col-9">
            <label for="categoria" class="control-label col-6 float-left">Item</label>
            <select id="categoria" class="form-control col-6" v-model="model.categoria">
              <option value="Linha">Linha</option>
              <option value="Tecido">Tecido</option>
              <option value="Bojo">Bojo</option>
              <option value="Elástico">Elástico</option>
              <option value="Fecho">Fecho</option>
              <option value="Arco">Arco</option>
            </select>
          </div>
          <div class="col-lg-2 col-10 mt-3">
            <label for="tipo" class="control-label col-5 float-left">Tipo</label>
            <select
              id="tipo"
              class="form-control col-7"
              v-model="model.tipo"
              v-if="model.categoria == 'Linha'"
            >
              <option value="Overlock">Overlock</option>
              <option value="Reta">Reta</option>
            </select>
            <select
              id="tipo"
              class="form-control col-6"
              v-model="model.tipo"
              v-else-if="model.categoria == 'Tecido'"
            >
              <option value="Cotton">Cotton</option>
              <option value="Microfibra">Microfibra</option>
              <option value="Liganete">Liganete</option>
            </select>
            <select
              id="tipo"
              class="form-control col-6"
              v-model="model.tipo"
              v-else-if="model.categoria == 'Bojo'"
            >
              <option value="Liso">Liso</option>
              <option value="Bolha">Bolha</option>
            </select>
            <select
              id="tipo"
              class="form-control col-6"
              v-model="model.tipo"
              v-else-if="model.categoria == 'Elástico'"
            >
              <option value="Alça 10">Alça 10</option>
              <option value="Alça 13">Alça 13</option>
              <option value="Alça 18">Alça 18</option>
              <option value="Viés Elástico">Viés Elástico</option>
              <option value="Viés Taquara">Viés Taquara</option>
              <option value="Base">Elástico para base</option>
            </select>
            <select
              id="tipo"
              class="form-control col-6"
              v-model="model.tipo"
              v-else-if="model.categoria == 'Fecho'"
            >
              <option value="Fecho Frontal">Fecho Frontal</option>
              <option value="Alça 13">Alça 13</option>
              <optgroup label="Fecho Costa">
                <option value="Normal">Normal</option>
                <option value="3x2">3x2</option>
                <option value="3x3">3x3</option>
              </optgroup>
            </select>
            <select
              id="tipo"
              class="form-control col-6"
              v-model="model.tipo"
              v-else-if="model.categoria == 'Arco'"
            >
              <optgroup label="Metal Aberto">
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
                <option value="XG">XG</option>
              </optgroup>
            </select>
          </div>
          <div class="col-lg-2 col-9 mt-3">
            <label for="qtd" class="control-label float-left col-7">Quantidade</label>
            <input type="number" class="form-control col-5" v-model="model.qtd" />
          </div>
          <div class="col-lg-2 col-9 mt-3">
            <label for="disp" class="label-control col-7 float-left">Disponibilidade</label>
            <input
              id="disp"
              type="checkbox"
              class="form-control col-4"
              v-model="model.disponibilidade"
            />
          </div>
          <div class="col-md-5 mt-3 col-12">
            <label for="obs" class="float-left">Obeservações</label>
            <textarea
              id="obs"
              rows="5"
              type="text"
              class="form-control"
              v-model="model.observacoes"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="row col-md-10 m-4">
        <div class="offset-lg-11 float-right">
          <router-link to="/listEstoque">
            <button class="btn btn-success" @click="salvarItem()">Salvar</button>
          </router-link>
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
  name: "FormEstoque",
  data() {
    return {
      model: {
        categoria: "Categoria",
        tipo: "",
        qtd: 0,
        disponibilidade: true
      },
      id: ""
    };
  },
  mounted() {
    if (this.$route.params.id != 0) this.fetchData(this.$route.params.id);
  },
  methods: {
    fetchData(id) {
      axios
        .get(
          `http://` +
            window.location.hostname +
            `:3000/getItemEstoqueById/${id}`
        )
        .then(response => {
          this.model = response.data.item;
          this.id = response.data._id;
        });
    },
    clearForm() {
      this.conta = {};
    },
    salvarItem() {
      if (this.model.qtd <= 0) this.model.disponibilidade = false;
      if (this.id == null || this.id == undefined || this.id == "") {
        axios
          .post(
            "http://" + window.location.hostname + ":3000/salvaItemEstoque",
            {
              item: this.model
            }
          )
          .then(function(response) {
          });
      } else {
        axios
          .put(
            `http://` +
              window.location.hostname +
              `:3000/putItemEstoque/${this.id}`,
            {
              item: this.model
            }
          )
          .then(function(response) {
          });
      }
    }
  }
};
</script>
<style>
</style>