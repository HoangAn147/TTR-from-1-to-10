<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <select
      :name="name"
      class="select"
      :disabled="disabled"
      :required="required"
      :value="modelValue"
      @change="onChange"
    >
      <option value="" disabled v-if="placeholder">{{ placeholder }}</option>
      <option
        v-for="(opt, idx) in normalizedOptions"
        :key="idx"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, default: () => [] }, // ['Nam','Nữ'] or [{label,value}]
  placeholder: { type: String, default: 'Chọn...' },
  name: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

const normalizedOptions = computed(() => {
  // Hỗ trợ cả mảng string lẫn mảng object {label, value}
  return props.options.map(o =>
    typeof o === 'object' ? { label: o.label ?? o.value, value: o.value ?? o.label } : { label: o, value: o }
  )
})

const onChange = (e) => emit('update:modelValue', e.target.value)
</script>

<style scoped>
.field { margin: 8px 0; }
.label { display: block; margin-bottom: 4px; font-weight: 600; }
.select { width: 100%; padding: 8px 10px; border: 1px solid #ddd; border-radius: 8px; background: #fff; }
</style>