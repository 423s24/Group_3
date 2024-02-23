// defining the routes for the application
import { createRouter, createWebHistory } from 'vue-router'
import { authModule } from './store/AuthModule.js';
import Dashboard from "./views/Dashboard.vue";
import Login from "./views/Login.vue";
import Checkin from "./views/Checkin.vue";
import Error from "./views/Error.vue";

const routes = [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/checkin', component: Checkin},
    { path: '/error', component: Error},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/error'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    const isError = authModule.state.errorMessage !== '';

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn || isError) {
        alert('You are not logged in');
        next('/error');
    } else {
        next();
    }
});

export default router
