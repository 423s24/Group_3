<template>
    <header class="container flex sticky top-0 bg-hrdc-teal shadow-lg h-20 items-center">
        <nav class ="flex items-center flex-shrink-0 text-white mr-6">
            <img src="../assets/vue.svg" class="mr-6"><!--placeholder logo using vue logo for now-->
            <ol class="flex items-center text-white text-xl list-none gap-3">
                <li class="mr-6 hover:text-hrdc-orange"><a href = "#">Dashboard</a></li>
                <li class="mr-6 hover:text-hrdc-orange"><a href = "#">Data</a></li>
                <li class="mr-6 hover:text-hrdc-orange"><a href = "#">Resources</a></li>
            </ol>
        </nav>
    </header>
</template>

<script>
    export default {
        name: 'Header'
    }
</script>