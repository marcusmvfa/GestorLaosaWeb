import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import Pedido from '@/components/Pedido/Pedido';
import CadastroPedido from '@/components/Pedido/CadastroPedido';
import ContasPaga from '@/components/ContasaPagar/ContasPaga';
import FormContasaPagar from '@/components/ContasaPagar/FormContasaPagar';
import FormClientes from '@/components/Cliente/FormClientes';
import ListCliente from '@/components/Cliente/ListCliente';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pedidos',
      name: 'Pedido',
      component: Pedido
    },
    {
      path: '/pedidoform/:id',
      name: 'CadastroPedido',
      component: CadastroPedido,
      props: true
    },
    {
      path: '/contaspagar',
      component: ContasPaga,
      title: 'ContasPagar',
    },
    {
      path: '/formcontaapagar/:id',
      component: FormContasaPagar,
      title: 'Form Conta a Pagar',
      props: true
    },
    {
      path: '/formCliente/:id',
      component: FormClientes,
      title: 'Form Cliente',
      props: true
    }
    ,
    {
      path: '/Clientes',
      name: 'ListCliente',
      component: ListCliente,
      title: 'List Clientes',
      props: true
    }
  ]
})
