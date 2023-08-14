<template>
    <div class="row g-0 justify-content-center">
        <div class="col col-12 col-md-6 d-flex justify-content-center">
            <div class="row w-100 g-3 px-2">
                <div class="col-auto">
                    <div class="input-group">
                        <label ref="droparea" class="upload-label dropable rounded shadow" for="pdfupload"
                            @dragenter="dragenter" @dragover="dragover" @drop="drop" @dragexit="dragexit">
                            <span class="material-icons-outlined mb-2">file_upload</span>
                            <span>Choose a PDF to start editing</span>
                        </label>
                        <input type="file" class="form-control" id="pdfupload" accept="application/pdf"
                            @change="emit('file_input', $event)" hidden>
                    </div>
                </div>
                <div class="col">
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="banner-wide shadow p-3">
                                <h2 class="text-4 fw-bold text-nowrap">Why Nocturne?</h2>
                                <p>Nocturne is a free, open-source, and client-side PDF editor that respects
                                    your privacy. All your PDFs are processed <b class="text-10">locally</b> on your
                                    device.</p>
                            </div>
                        </div>
                        <div class="col">
                            <div class="banner-square shadow p-3">
                                <h2 class="text-4 fw-bold">Pipelines</h2>
                                <img src="/images/pipes_compressed.png" class="img-fluid rounded mb-2">
                                <span>Automate your workflow with Nocturne's pipelines, which allow you to
                                    chain multiple operations together.</span>
                            </div>
                        </div>
                        <div class="col">
                            <div class="banner-square shadow p-3">
                                <h2 class="text-4 fw-bold">Features</h2>
                                <ul>
                                    <li>Rotate</li>
                                    <li>Add</li>
                                    <li>Remove</li>
                                    <li>Extract</li>
                                    <li>Reverse</li>
                                    <li>Enumerate</li>
                                    <li>Scale</li>
                                    <li>Metadata</li>
                                    <li>Rename</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const droparea = ref(null);
const emit = defineEmits(['file_input']);

async function dragover(event) {
    event.preventDefault();
}

async function dragenter(event) {
    event.preventDefault();
    droparea.value.classList.add('dragover');
}

async function dragexit(event) {
    event.stopPropagation();
    droparea.value.classList.remove('dragover');
}

async function drop(event) {
    event.preventDefault();
    droparea.value.classList.remove('dragover');

    emit('file_input', {
        target: {
            files: event.dataTransfer.files
        }
    });
}
</script>