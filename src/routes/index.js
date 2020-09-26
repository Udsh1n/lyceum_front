import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/mainpage'
import SingIn from "@/views/SingIn";
import SingUp from "@/views/SingUp";

Vue.use(VueRouter)

const routes=[
    {
        path: '/',
        name: 'Home',
        component: Home,
        params: true,
    },
    {
        path:'/singin',
        name: 'Login',
        component: SingIn
    },
    {
        path: '/singup',
        name: 'CreateUser',
        component: SingUp
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
export default router
