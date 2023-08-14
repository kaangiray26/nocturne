<template>
    <div class="operation">
        <div class="d-flex flex-column">
            <div class="d-flex">
                <div class="theme-btn" @click="emit('remove_operation', props.index)">
                    <span class="material-icons-outlined">
                        cancel
                    </span>
                </div>
                <div class="theme-btn bg-4 text-0">
                    <span class="material-icons-outlined">{{ props.op.icon }}</span>
                    <span>{{ props.op.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['remove_operation', 'update_operation']);
const props = defineProps(['op', 'index']);
</script>