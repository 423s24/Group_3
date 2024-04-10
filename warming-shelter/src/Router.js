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
import AssignSpaces from './views/AssignSpaces.vue';
import UserManagement from "./views/UserManagement.vue";

const routes = [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true} },
    { path: '/enterguests', component: EnterGuests, meta: { requiresAuth: true}},
    { path: '/checkin', component: Checkin, meta: { requiresAuth: true}},
    { path: '/error', component: Error, meta: { requiresAuth: true}},
    { path: '/viewallguests', component: ViewAllGuests, meta: { requiresAuth: true}},
    { path: '/currentguests', component: CurrentGuests, meta: { requiresAuth: true}},
    { path: '/resources', component: Resources, meta: { requiresAuth: true} },
    { path: '/guest/:id', name: 'GuestProfile', component: GuestProfile,  meta: { requiresAuth: true}},
    { path: '/assignspaces', component: AssignSpaces, meta: { requiresAuth: true} },
    {path: '/user-management', component: UserManagement, meta: { requiresAuth: true, requiresAdmin: true }}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/error'];
    const authRequired = !publicPages.includes(to.path);
    const cachedUser = JSON.parse(localStorage.getItem('user'));
    const isError = authModule.state.errorMessage !== '';

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !cachedUser || isError) {
        alert('You are not logged in');
        next('/error');
    } else {
        // Check if the target route requires an admin
        if (to.matched.some(record => record.meta.requiresAdmin)) {
            // Check if the user is a system_administrator
            if (cachedUser.user.role !== 'system_administrator') {
                // If not, redirect to the dashboard
                next({ name: 'Dashboard' });
            } else {
                // If yes, allow the navigation
                next();
            }
        } else {
            // If the target route does not require an admin, allow the navigation
            next();
        }
    }
});

export default router
