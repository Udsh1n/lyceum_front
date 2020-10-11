import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/mainpage'
import SingIn from "@/views/SingIn";
import SingUp from "@/views/SingUp";
import Test from "@/views/test"
import admin from "@/views/admin";
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
        component: SingUp,

    },
    {
        path: '/test',
        name: 'test',
        component: Test
    },
    {
        path: '/admin',
        name: 'adminpanel',
        component: admin,
        meta: {
            title: 'AdminPanel',
            forVistors: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
export default router
