import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/app',
        name: 'home',
        component: () => import('./components/header.vue')
    },
    {
        path: '/app/register',
        name: 'register',
        component: () => import('./components/register.vue')
    },
    {
        path: '/app/*',
        name: 'error',
        component: () => import('./components/error.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
    
const mainApp = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')