<template>
    <div v-if="loading" class="d-flex justify-content-center align-items-center cover-all position-absolute z-1">
        <div class="position-absolute bg-1 cover-all opacity-50"></div>
        <div class="d-flex circle bg-black p-2">
            <div class="spinner-border text-4" role="status"></div>
        </div>
    </div>
    <div v-if="!pdf_loaded">
        <Introduction @file_input="handle_file_input" />
    </div>
    <div v-else>
        <div class="row g-0 justify-content-center">
            <div class="col col-12 col-md-6 px-3">
                <div class="d-flex flex-column text-4 bg-0 p-3 rounded shadow mb-3">
                    <h3>File Details</h3>
                    <div class="d-flex flex-wrap">
                        <span class="text-value mb-2 me-2">{{ pdf.name }}</span>
                        <span class="text-value mb-2 me-2">{{ format_size(pdf.size) }}</span>
                        <span class="text-value mb-2 me-2">{{ doc.getPageCount() }} pages</span>
                    </div>
                    <div class="mb-2">
                        <button type="button" class="theme-btn bg-13 text-0 hoverable"
                            @click="metadata_visible = !metadata_visible">
                            <span class="material-icons-outlined">
                                description
                            </span>
                            <span v-if="metadata_visible" class="fw-bold">Hide metadata</span>
                            <span v-else class="fw-bold">Show metadata</span>
                        </button>
                    </div>
                    <div v-show="metadata_visible" class="mb-2">
                        <div class="d-flex flex-column text-value rounded p-2">
                            <pre>Title             : {{ doc.getTitle() }}
Author            : {{ doc.getAuthor() }}
Subject           : {{ doc.getSubject() }}
Creator           : {{ doc.getCreator() }}
Keywords          : {{ doc.getKeywords() }}
Producer          : {{ doc.getProducer() }}
Creation Date     : {{ doc.getCreationDate() }}
Modification Date : {{ doc.getModificationDate() }}</pre>
                        </div>
                    </div>
                    <div class="d-flex flex-wrap">
                        <button type="button" class="theme-btn bg-4 text-0 mb-2 me-2" data="rotate" draggable="true"
                            @dragstart="dragstart" @drop="drop">
                            <span class="material-icons-outlined">refresh</span>
                            <span>Rotate</span>
                        </button>
                        <button type="button" class="theme-btn bg-4 text-0 mb-2 me-2" data="add" draggable="true"
                            @dragstart="dragstart" @drop="drop">
                            <span class="material-icons-outlined">layers</span>
                            <span>Add</span>
                        </button>
                        <button type="button" class="theme-btn bg-4 text-0 mb-2 me-2" data="remove" draggable="true"
                            @dragstart="dragstart" @drop="drop">
                            <span class="material-icons-outlined">delete</span>
                            <span>Remove</span>
                        </button>
                        <button type="button" class="theme-btn bg-4 text-0 mb-2 me-2" data="extract" draggable="true"
                            @dragstart="dragstart" @drop="drop">
                            <span class="material-icons-outlined">call_split</span>
                            <span>Extract</span>
                        </button>
                        <button type="button" class="theme-btn bg-4 text-0 mb-2 me-2" data="reverse" draggable="true"
                            @dragstart="dragstart" @drop="drop">
                            <span class="material-icons-outlined">low_priority</span>
                            <span>Reverse</span>
                        </button>
                        <button type="button" class="theme-btn bg-4 text-0 mb-2 me-2" data="enumerate" draggable="true"
                            @dragstart="dragstart" @drop="drop">
                            <span class="material-icons-outlined">format_list_numbered</span>
                            <span>Enumerate</span>
                        </button>
                        <button type="button" class="theme-btn bg-4 text-0 mb-2 me-2" data="scale" draggable="true"
                            @dragstart="dragstart" @drop="drop">
                            <span class="material-icons-outlined">aspect_ratio</span>
                            <span>Scale</span>
                        </button>
                        <button type="button" class="theme-btn bg-4 text-0 mb-2 me-2" data="metadata" draggable="true"
                            @dragstart="dragstart" @drop="drop">
                            <span class="material-icons-outlined">info</span>
                            <span>Metadata</span>
                        </button>
                        <button type="button" class="theme-btn bg-4 text-0 mb-2 me-2" data="rename" draggable="true"
                            @dragstart="dragstart" @drop="drop">
                            <span class="material-icons-outlined">title</span>
                            <span>Rename</span>
                        </button>
                    </div>
                </div>
                <div class="d-flex flex-column text-4 bg-0 p-3 rounded shadow mb-3">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3>Pipeline</h3>
                        <div class="d-flex">
                            <div class="theme-btn" @click="select_pipeline">
                                <span class="material-icons-outlined">inventory_2</span>
                            </div>
                            <div class="theme-btn" @click="clear_pipeline">
                                <span class="material-icons-outlined">check_box_outline_blank</span>
                            </div>
                        </div>
                    </div>
                    <div class="operations">
                        <div v-for="(op, index) in pipeline">
                            <div v-show="index > 0">
                                <div class="d-flex justify-content-center pb-2">
                                    <span class="material-icons-outlined">arrow_downward</span>
                                </div>
                            </div>
                            <component :is="operations[op.name]" :op="op" :index="index"
                                @remove_operation="remove_operation" @update_operation="update_operation" />
                        </div>
                        <div ref="droparea" class="operation droppable" @dragover="dragover" @drop="drop"
                            @dragenter="dragenter" @dragexit="dragexit">
                            <div class="d-flex">
                                <span>Drag and drop operations here.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end align-items-center">
                    <button type="button" class="theme-btn bg-4 text-0 me-2" @click="save">
                        <span class="material-icons">save</span>
                        <span>Save</span>
                    </button>
                    <button v-if="!running" type="button" class="theme-btn bg-4 text-0" @click="run">
                        <span class="material-icons">play_arrow</span>
                        <span>Run</span>
                    </button>
                    <button v-if="running" class="theme-btn bg-3 text-4" type="button" disabled>
                        <span class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>
                        <span role="status">Running...</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <Save ref="saveModal" :pipeline="pipeline" />
    <Select ref="selectModal" @load="load_pipeline" />
</template>

<script setup>
import { ref } from 'vue';
import { PDFDocument, degrees, StandardFonts, rgb } from 'pdf-lib';
import Introduction from './Introduction.vue';
import Save from './Save.vue';
import Select from './Select.vue';

import Rotate from '../operations/Rotate.vue';
import Add from '../operations/Add.vue';
import Remove from '../operations/Remove.vue';
import Extract from '../operations/Extract.vue';
import Reverse from '../operations/Reverse.vue';
import Enumerate from '../operations/Enumerate.vue'
import Scale from '../operations/Scale.vue';
import Metadata from '../operations/Metadata.vue';
import Rename from '../operations/Rename.vue';

const pdf = ref(null);
const doc = ref(null);
const font = ref(null);

const saveModal = ref(null);
const selectModal = ref(null);

const loading = ref(false);
const running = ref(false);

const metadata_visible = ref(false);
const pdf_loaded = ref(false);

const droparea = ref(null);
const pdf_arr_buff = ref(null);

const pipeline = ref([]);
const operations = {
    'Rotate': Rotate,
    'Add': Add,
    'Remove': Remove,
    'Extract': Extract,
    'Reverse': Reverse,
    'Enumerate': Enumerate,
    'Scale': Scale,
    'Metadata': Metadata,
    'Rename': Rename,
}

function format_size(size) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (size >= 1024) {
        size /= 1024;
        i++;
    }
    return `${size.toFixed(2)} ${units[i]}`;
}

async function handle_file_input(e) {
    let f = e.target.files[0];
    if (f.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        return;
    }

    loading.value = true;
    pdf.value = f;
    f.arrayBuffer()
        .then((array_buff) => {
            pdf_arr_buff.value = array_buff;
            PDFDocument.load(pdf_arr_buff.value)
                .then((_doc) => {
                    doc.value = _doc;
                    font.value = doc.value.embedStandardFont(StandardFonts.Helvetica);
                    pdf_loaded.value = true;
                    loading.value = false;
                })
        })
        .catch((err) => {
            console.log(err);
        });
}

async function drop(event) {
    event.preventDefault();
    droparea.value.classList.remove('dragover');

    let op = event.dataTransfer.getData('text');
    if (op === 'rotate') {
        pipeline.value.push({
            name: 'Rotate',
            icon: 'refresh',
            params: [
                {
                    name: 'Angle',
                    value: 90
                },
                {
                    name: 'Pages',
                    value: 'all'
                }
            ]
        });
        return
    }

    if (op === 'add') {
        pipeline.value.push({
            name: 'Add',
            icon: 'layers',
            params: [
                {
                    name: 'File',
                    value: ''
                },
                {
                    name: 'Pages',
                    value: 'all'
                }
            ]
        });
        return
    }

    if (op === 'remove') {
        pipeline.value.push({
            name: 'Remove',
            icon: 'delete',
            params: [
                {
                    name: 'Pages',
                    value: '1'
                }
            ]
        });
        return
    }

    if (op === 'extract') {
        pipeline.value.push({
            name: 'Extract',
            icon: 'call_split',
            params: [
                {
                    name: 'Pages',
                    value: '1-2'
                }
            ]
        });
        return
    }

    if (op === 'reverse') {
        pipeline.value.push({
            name: 'Reverse',
            icon: 'low_priority',
            params: []
        });
        return
    }

    if (op === 'enumerate') {
        pipeline.value.push({
            name: 'Enumerate',
            icon: 'format_list_numbered',
            params: []
        })
        return
    }

    if (op === 'scale') {
        pipeline.value.push({
            name: 'Scale',
            icon: 'aspect_ratio',
            params: [
                {
                    name: 'Width',
                    value: 1.0
                },
                {
                    name: 'Height',
                    value: 1.0
                },
                {
                    name: 'Pages',
                    value: 'all'
                }
            ]
        })
        return
    }

    if (op === 'metadata') {
        pipeline.value.push({
            name: 'Metadata',
            icon: 'info',
            params: [
                {
                    name: 'Title',
                    value: doc.value.getTitle()
                },
                {
                    name: 'Author',
                    value: doc.value.getAuthor()
                },
                {
                    name: 'Subject',
                    value: doc.value.getSubject()
                },
                {
                    name: 'Keywords',
                    value: doc.value.getKeywords()
                },
                {
                    name: 'Producer',
                    value: doc.value.getProducer()
                },
                {
                    name: 'Creator',
                    value: doc.value.getCreator()
                },
                {
                    name: 'Creation Date',
                    value: doc.value.getCreationDate()
                },
                {
                    name: 'Modification Date',
                    value: doc.value.getModificationDate()
                }
            ]
        })
        return
    }

    if (op === 'rename') {
        pipeline.value.push({
            name: 'Rename',
            icon: 'title',
            params: [
                {
                    name: 'Name',
                    value: pdf.value.name.split('.')[0]
                }
            ]
        })
        return
    }
}

async function dragstart(event) {
    event.dataTransfer.setData('text', event.target.getAttribute('data'));
}

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

async function remove_operation(index) {
    pipeline.value.splice(index, 1);
}

async function update_operation(index, op) {
    pipeline.value[index] = op;
}

async function clear_pipeline() {
    pipeline.value = [];
}

async function save() {
    if (!pipeline.value.length) {
        alert('Please add some operations to the pipeline.');
        return;
    }

    saveModal.value.show();
}

async function select_pipeline() {
    selectModal.value.show();
}

async function load_pipeline(pipe) {
    pipeline.value = pipe;
}

async function run() {
    running.value = true;

    // Get a fresh copy of the PDF document
    let filename = pdf.value.name;
    let _doc = await PDFDocument.load(pdf_arr_buff.value);

    // Run each operation in the pipeline
    for (const op of pipeline.value) {
        // rotate
        if (op.name === 'Rotate') {
            let pages = _doc.getPages();
            let angle = parseInt(op.params[0].value);
            let page_nums = op.params[1].value;

            if (page_nums === 'all') {
                pages.forEach((page) => page.setRotation(degrees(page.getRotation().angle + angle)));
            }

            else {
                page_nums.split(',').forEach((page_num) => pages[parseInt(page_num) - 1].setRotation(degrees(pages[parseInt(page_num) - 1].getRotation().angle + angle)));
            }
            continue
        }

        // add
        if (op.name === 'Add') {
            let file = op.params[0].value;
            let page_nums = op.params[1].value;
            let file_arr_buff = await file.arrayBuffer();
            let _file = await PDFDocument.load(file_arr_buff);
            let copied_pages = await _doc.copyPages(_file, _file.getPageIndices());

            if (page_nums === 'all') {
                copied_pages.map((page) => _doc.addPage(page));
            }

            else {
                page_nums.split(',').map((page_num) => _doc.addPage(copied_pages[parseInt(page_num) - 1]));
            };
            continue
        }

        // remove
        if (op.name === 'Remove') {
            let page_nums = op.params[0].value.split(',').sort((a, b) => b - a);
            page_nums.map((page_num) => _doc.removePage(parseInt(page_num) - 1));
            continue
        }

        // extract
        if (op.name === 'Extract') {
            let empty = await PDFDocument.create();
            let page_nums = op.params[0].value.split('-').map((page_num) => parseInt(page_num) - 1);
            page_nums = [...Array(page_nums.slice(-1)[0] + 1).keys()].slice(page_nums[0]);
            let extracted_pages = await empty.copyPages(_doc, page_nums);
            extracted_pages.map((page) => empty.addPage(page));
            _doc = empty;
            continue
        }

        // reverse
        if (op.name === 'Reverse') {
            let empty = await PDFDocument.create();
            let copied_pages = await empty.copyPages(_doc, _doc.getPageIndices());
            copied_pages.reverse().map((page) => empty.addPage(page));
            _doc = empty;
            continue
        }

        // enumerate
        if (op.name === 'Enumerate') {
            let pages = _doc.getPages();
            pages.map((page, index) => {
                let text = `${index + 1}`;
                let textWidth = font.value.widthOfTextAtSize(text, 12);
                let textHeight = font.value.heightAtSize(12);
                page.drawText(text, {
                    x: page.getWidth() - textWidth - 12,
                    y: textHeight + 12,
                    size: 12,
                    color: rgb(0, 0, 0)
                });
            });
            continue
        }

        // scale
        if (op.name === 'Scale') {
            let pages = _doc.getPages();
            let width = parseFloat(op.params[0].value);
            let height = parseFloat(op.params[1].value);
            let page_nums = op.params[2].value;

            if (page_nums === 'all') {
                pages.map((page) => page.scale(width, height));
            }

            else {
                page_nums.split(',').map((page_num) => pages[parseInt(page_num) - 1].scale(width, height));
            }
            continue
        }

        // metadata
        if (op.name === 'Metadata') {
            _doc.setTitle(op.params[0].value || '');
            _doc.setAuthor(op.params[1].value || '');
            _doc.setSubject(op.params[2].value || '');
            _doc.setKeywords(op.params[3].value ? op.params[3].value.split(',') : []);
            _doc.setProducer(op.params[4].value || '');
            _doc.setCreator(op.params[5].value || '');
            _doc.setCreationDate(new Date(op.params[6].value));
            _doc.setModificationDate(new Date(op.params[7].value));
            continue
        }

        // rename
        if (op.name === 'Rename') {
            filename = op.params[0].value + '.pdf';
            continue
        }
    }

    let pdf_bytes = await _doc.save();
    let blob = new Blob([pdf_bytes], { type: 'application/pdf' });
    let url = URL.createObjectURL(blob);

    // Download the PDF file
    let link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    running.value = false;
}
</script>