<template>
    <div ref="modalEl" class="modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Select Pipeline</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-if="!pipelines.length">
                        <p class="text-center">No saved pipelines</p>
                    </div>
                    <ul class="list-group">
                        <li v-for="(pipe, index) in pipelines" class="list-group-item">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>{{ pipe.name }}</div>
                                <div class="d-flex">
                                    <button class="btn btn-outline-dark me-2" type="button"
                                        @click="load_pipeline(pipe)">Load</button>
                                    <button class="btn btn-outline-danger" type="button"
                                        @click="delete_pipeline(index)">Delete</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';

const modal = ref(null);
const modalEl = ref(null);
const pipelines = ref([]);

const emit = defineEmits(["load"]);

function _show() {
    pipelines.value = JSON.parse(localStorage.getItem("pipelines")) || [];
    modal.value.show();
}

function _hide() {
    modal.value.hide();
}

async function load_pipeline(pipe) {
    emit("load", pipe.pipeline);
    _hide();
}

async function delete_pipeline(index) {
    pipelines.value.splice(index, 1);
    localStorage.setItem("pipelines", JSON.stringify(pipelines.value));
}

defineExpose({
    show: _show,
    hide: _hide
})

onMounted(() => {
    modal.value = new Modal(modalEl.value, {
        keyboard: false,
        backdrop: 'static'
    })
})

</script>