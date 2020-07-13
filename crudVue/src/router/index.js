import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import Pedido from '@/components/Pedido/Pedido';
import CadastroPedido from '@/components/Pedido/CadastroPedido';
import ContasPaga from '@/components/ContasaPagar/ContasPaga';
import ListContas from '@/components/ContasAReceber/ListContas';
import FormContasaPagar from '@/components/ContasaPagar/FormContasaPagar';
import FormContasaReceber from '@/components/ContasAReceber/FormContasaReceber';

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
      path: '/pedidoform',
      name: 'CadastroPedido',
      component: CadastroPedido
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
      path: '/listContasReceber',
      component: ListContas,
      title: 'ContasAReceber',
    },
    {
      path: '/formcontaareceber/:id',
      component: FormContasaReceber,
      title: 'Form Conta a Receber',
      props: true
    }
  ]
})
