import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home';
import Carrinho from './components/Carrinho';
import Usuario from './components/Usuario';
import Produto from './components/Produto';
import EditarComentario from './components/EditarComentario'


Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: 
    [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/carrinho',
            name: 'carrinho',
            component: Carrinho
        },
        {
            path: '/login',
            name: 'usuario',
            component: Usuario
        },
        {
            path: '/produto/:id',
            name: 'produto',
            component: Produto,
            children: [
                {
                    path: '/editComentario/:idC',
                    name: 'editar-comentario',
                    component: EditarComentario
                }  
            ]
        }
    ]

});