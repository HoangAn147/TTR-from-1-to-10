<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <input
      :name="name"
      type="text"
      class="input"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  placeholder: { type: String, default: '' },
  name: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])
const onInput = (e) => emit('update:modelValue', e.target.value)
</script>

<style scoped>
.field { margin: 8px 0; }
.label { display: block; margin-bottom: 4px; font-weight: 600; }
.input { width: 100%; padding: 8px 10px; border: 1px solid #ddd; border-radius: 8px; }
</style>
