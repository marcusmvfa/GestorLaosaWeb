import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import Pedido from '@/components/Pedido/Pedido';
import CadastroPedido from '@/components/Pedido/CadastroPedido';
import ContasPaga from '@/components/ContasaPagar/ContasPaga';
import FormContasaPagar from '@/components/ContasaPagar/FormContasaPagar';

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
    }
  ]
})
