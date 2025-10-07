<script setup>
import { useHead } from '@vueuse/head'

useHead({
  title: '404 - Trang không tồn tại',
  meta: [
    {
      name: 'description',
      content: 'Trang bạn yêu cầu không tồn tại hoặc đã bị xóa.'
    }
  ]
})

const error = {
  statusCode: 404,
  statusMessage: 'Oops! Trang bạn đang tìm không tồn tại.'
}
</script>

<template>
  <div class="error-page">
    <div class="error-container">
      <div class="emoji">😢</div>
      <h1 class="error-code">{{ error.statusCode }}</h1>
      <p class="error-message">{{ error.statusMessage }}</p>
      <router-link to="/" class="back-home">← Quay lại trang chủ</router-link>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f3f4f6 0%, #e0e7ff 100%);
  font-family: 'Inter', sans-serif;
  text-align: center;
  color: #374151;
}

.error-container {
  padding: 2rem 3rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  max-width: 500px;
  width: 90%;
  animation: fadeIn 0.6s ease;
}

.emoji {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.error-code {
  font-size: 5rem;
  font-weight: 800;
  color: #ef4444;
  margin-bottom: 0.5rem;
}

.error-message {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.back-home {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #2563eb;
  color: white;
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.25s ease;
}

.back-home:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
