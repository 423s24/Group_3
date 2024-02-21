// defining the routes for the application
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "./views/Dashboard.vue";
import Login from "./views/Login.vue";
import Checkin from "./views/Checkin.vue";


const routes = [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/checkin', component: Checkin}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
