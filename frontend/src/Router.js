// defining the routes for the application
import {createRouter, createWebHistory} from 'vue-router'
import {userModule} from './store/UserModule.js';
import Dashboard from "./views/Dashboard.vue";
import EnterGuests from "./views/EnterGuests.vue"
import Login from "./views/Login.vue";
import Checkin from "./views/Checkin.vue";
import Error from "./views/Error.vue";
import ViewAllGuests from "./views/ViewAllGuests.vue"
import GuestProfile from './views/GuestProfile.vue';
import CurrentGuests from './views/CurrentGuests.vue';
import Resources from './views/Resources.vue';
import AssignSpaces from './views/AssignSpaces.vue';
import UserManagement from "./views/UserManagement.vue";

const routes = [
    {path: '/', component: Login},
    {path: '/dashboard', component: Dashboard, meta: {requiresAuth: true}},
    {path: '/enterguests', component: EnterGuests, meta: {requiresAuth: true}},
    {path: '/checkin', component: Checkin, meta: {requiresAuth: true}},
    {path: '/error', component: Error, meta: {requiresAuth: true}},
    {path: '/viewallguests', component: ViewAllGuests, meta: {requiresAuth: true}},
    {path: '/currentguests', component: CurrentGuests, meta: {requiresAuth: true}},
    {path: '/resources', component: Resources, meta: {requiresAuth: true}},
    {path: '/guest/:id', name: 'GuestProfile', component: GuestProfile, meta: {requiresAuth: true}},
    {path: '/assignspaces', component: AssignSpaces, meta: {requiresAuth: true}},
    {path: '/user-management', component: UserManagement, meta: {requiresAuth: true, requiresAdmin: true}}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!userModule.state.user) {
            next({
                path: '/',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
});

export default router
