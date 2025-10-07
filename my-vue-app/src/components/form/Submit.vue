<template>
  <button type="button" class="btn" @click="$emit('click')">
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
defineProps({ label: { type: String, default: 'Submit' } })
defineEmits(['click'])
</script>

<style scoped>
.btn { padding: 8px 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; }
</style>