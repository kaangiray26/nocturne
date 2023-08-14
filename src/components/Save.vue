<template>
    <div ref="modalEl" class="modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Save Pipeline</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">
                        <input v-model="name" type="text" class="form-control" placeholder="Pick a name for your pipeline"
                            aria-label="Recipient's username">
                        <button class="btn btn-outline-dark" type="button" @click="save_pipeline">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';

const name = ref("");
const modal = ref(null);
const modalEl = ref(null);

const props = defineProps({
    pipeline: {
        type: Array,
        required: true
    }
})

function _show() {
    modal.value.show();
}

function _hide() {
    modal.value.hide();
}

async function save_pipeline() {
    console.log("Saving pipeline");
    let pipe = props.pipeline;
    let saved_pipes = JSON.parse(localStorage.getItem("pipelines"));

    if (saved_pipes == null) {
        saved_pipes = [];
    }

    saved_pipes.push({
        name: name.value,
        pipeline: pipe
    });

    localStorage.setItem("pipelines", JSON.stringify(saved_pipes));
    _hide();
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