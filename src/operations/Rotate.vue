<template>
    <div class="operation">
        <div class="d-flex flex-column">
            <div class="d-flex mb-2">
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
            <div class="form-floating mb-2">
                <input type="number" class="form-control" id="floatingInputValue1" :value="op.params[0].value"
                    @input="op.params[0].value = $event.target.value; update_operation()">
                <label for="floatingInputValue1">{{ op.params[0].name }}</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control" id="floatingInputValue2" :value="op.params[1].value"
                    @input="op.params[1].value = $event.target.value; update_operation()">
                <label for="floatingInputValue2">{{ op.params[1].name }}</label>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['remove_operation', 'update_operation']);
const props = defineProps(['op', 'index']);

async function update_operation() {
    emit('update_operation', props.index, props.op);
}
</script>
