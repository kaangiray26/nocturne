import { createRouter, createWebHistory } from 'vue-router';

import Workspace from '/components/Workspace.vue'
import About from '/components/About.vue'

const routes = [
    {
        path: "/",
        component: Workspace,
    },
    {
        path: "/about",
        component: About
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router