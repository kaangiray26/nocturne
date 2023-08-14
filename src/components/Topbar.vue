<template>
    <div class="row g-0 justify-content-center">
        <div class="col col-12 col-md-6">
            <div class="d-flex flex-wrap justify-content-between align-items-center p-3 rounded">
                <router-link to="/" class="me-2 mb-2 user-select-none">
                    <div class="d-flex align-items-center">
                        <img src="/images/icon.png" alt="Nocturne" height="48" class="me-2" />
                        <span class="fw-bold text-0 m-0">Nocturne</span>
                    </div>
                </router-link>
                <div class="d-flex flex-wrap align-items-center">
                    <a href="/" class="d-flex align-items-center text-0 fs-6 me-2 text-decoration-underline fw-500">
                        <span>Reload</span>
                    </a>
                    <router-link to="/about"
                        class="d-flex align-items-center text-0 fs-6 me-2 text-decoration-underline fw-500">
                        <span>About</span>
                    </router-link>
                    <a href="https://github.com/kaangiray26/nocturne"
                        class="d-flex align-items-center text-0 fs-6 text-decoration-underline fw-500">
                        <span class="me-2">GitHub</span>
                        <span class="bi bi-github"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>