<template>
    <div class="d-flex flex-column flex-grow">
        <Topbar />
        <router-view />
        <Footer />
    </div>
</template>

<script setup>
import Topbar from './Topbar.vue';
import Footer from './Footer.vue';
</script>