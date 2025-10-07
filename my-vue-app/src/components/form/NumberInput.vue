<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <input
      :name="name"
      type="number"
      class="input"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '' },
  modelValue: { type: [Number, String], default: '' },
  placeholder: { type: String, default: '' },
  name: { type: String, default: '' },
  min: { type: [Number, String], default: undefined },
  max: { type: [Number, String], default: undefined },
  step: { type: [Number, String], default: 1 },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])
const onInput = (e) => {
  const v = e.target.value
  emit('update:modelValue', v === '' ? '' : Number(v))
}
</script>

<style scoped>
.field { margin: 8px 0; }
.label { display: block; margin-bottom: 4px; font-weight: 600; }
.input { width: 100%; padding: 8px 10px; border: 1px solid #ddd; border-radius: 8px; }
</style>