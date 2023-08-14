import { createRouter, createWebHistory } from 'vue-router';
import Workspace from '/components/Workspace.vue'

const routes = [
    {
        path: "/",
        component: Workspace,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router