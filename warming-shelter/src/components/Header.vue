<template>
    <header class="flex sticky top-0 bg-hrdc-teal shadow-lg h-20 items-center">
        <Wrapper>
            <nav class="flex items-center flex-shrink-0 text-white mr-6">
                <img src="../assets/vue.svg" class="mr-6"><!--placeholder logo using vue logo for now-->
                <ol class="flex items-center text-white text-xl list-none gap-3">
                    <router-link to="/dashboard" class="mr-6 hover:text-hrdc-orange">Dashboard</router-link>
                    <router-link to="/enterguests" class="mr-6 hover:text-hrdc-orange">Enter Guests</router-link>
                    <router-link to="/currentguests" class="mr-6 hover:text-hrdc-orange">View Current Guests</router-link>
                    <router-link to="/dashboard" class="mr-6 hover:text-hrdc-orange">Assign Spaces</router-link>
                    <router-link to="/viewallguests" class="mr-6 hover:text-hrdc-orange">View All Data</router-link>
                    <router-link to="/resources" class="mr-6 hover:text-hrdc-orange">Resources</router-link>
                    <router-link to="/" class="mr-6 hover:text-hrdc-orange" @click.native="logout">Logout</router-link>
                    <!-- <li class="mr-6 hover:text-hrdc-orange"><a href = "#">Dashboard</a></li>
                    <li class="mr-6 hover:text-hrdc-orange"><a href = "#">Enter Guests</a></li>
                    <li class="mr-6 hover:text-hrdc-orange"><a href = "#">View Current Guests</a></li>
                    <li class="mr-6 hover:text-hrdc-orange"><a href = "#">Assign Spaces</a></li>
                    <li class="mr-6 hover:text-hrdc-orange"><a href = "#">View All Data</a></li>
                    <li class="mr-6 hover:text-hrdc-orange"><a href = "#">Resources</a></li> -->
                </ol>
            </nav>
        </Wrapper>

    </header>
</template>

<script>
import Wrapper from './Wrapper.vue'
import store from '../store/store';
import router from '../Router';

export default {
    name: 'Header',
    components: {
        Wrapper
    },
    methods: {
        logout() {
            store.dispatch("authModule/logout", {
                
            });
            router.push("/")
        },
    }
}
</script>