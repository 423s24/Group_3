// defining the routes for the application
import { createRouter, createWebHistory } from 'vue-router'
import { authModule } from './store/AuthModule.js';
import Dashboard from "./views/Dashboard.vue";
import EnterGuests from "./views/EnterGuests.vue"
import Login from "./views/Login.vue";
import Checkin from "./views/Checkin.vue";
import Error from "./views/Error.vue";
import ViewAllGuests from "./views/ViewAllGuests.vue"
import GuestProfile from './views/GuestProfile.vue';
import CurrentGuests from './views/CurrentGuests.vue';
import Resources from './views/Resources.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/enterguests', component: EnterGuests},
    { path: '/checkin', component: Checkin},
    { path: '/error', component: Error},
    { path: '/viewallguests', component: ViewAllGuests},
    { path: '/currentguests', component: CurrentGuests},
    { path: '/resources', component: Resources},
    { path: '/guest/:id', name: 'GuestProfile', component: GuestProfile}
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
