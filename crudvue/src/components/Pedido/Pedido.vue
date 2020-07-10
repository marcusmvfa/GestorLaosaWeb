<template>
  <div class="row px-4">
    <div class="row col-md-12 pt-1 border-bottom">
      <h1 class="pl-3">Lista de Pedidos</h1>
    </div>
    <div class="row col-md-12 pt-1 pl-3">
      <router-link to="/pedidoform">
        <button class="btn btn-outline-primary">Novo Pedido</button>
      </router-link>
    </div>
    <div class="col-md-12 pt-1">
      <table class="table table-hover">
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
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <div class="btn-group">
                <button class="btn btn-success">Edit</button>
                <button class="btn btn-danger">Edit</button>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <div class="btn-group">
              <button class="btn btn-success">Edit</button>
              <button class="btn btn-danger">Edit</button>
            </div>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
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
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.border-bottom {
  border-bottom: 1px solid #dee2e6 !important;
}
</style>