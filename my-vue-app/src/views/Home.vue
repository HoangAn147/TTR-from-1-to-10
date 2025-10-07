<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import Header from '../components/Header.vue'
import About from '../components/About.vue'
import Footer from '../components/Footer.vue'

import TextInput from '../components/form/TextInput.vue'
import NumberInput from '../components/form/NumberInput.vue'
import SelectInput from '../components/form/SelectInput.vue'
import Submit from '../components/form/Submit.vue'

import { useAuthStore } from '../stores/auth'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import { useCounter } from '../composables/useCounter'

import { defineAsyncComponent, shallowRef, onMounted, reactive, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const form = reactive({
  firstName: '',
  lastName: '',
  age: null,
  gender: '',
  email: ''
})

const rules = {
  firstName: { required },
  lastName:  { required },
  age:       { required },
  gender:    { required },
  email:     { required, email }
}
const v$ = useVuelidate(rules, form)
const fullName = computed(() => `${form.firstName} ${form.lastName}`.trim())

const submit = async () => {
  const ok = await v$.value.$validate()
  if (!ok) return alert('Form is invalid!')
  alert(`Submitted: ${fullName.value} | ${form.age} | ${form.gender} | ${form.email}`)
}


const layout = [
  { type: 'text',   key: 'firstName', props: { label: 'Firstname' } },
  { type: 'text',   key: 'lastName',  props: { label: 'Lastname' } },
  { type: 'number', key: 'age',       props: { label: 'Tuổi', min: 1 } },
  { type: 'select', key: 'gender',    props: { label: 'Giới tính', options: ['Nam', 'Nữ'] } },
  { type: 'text',   key: 'email',     props: { label: 'Email', placeholder: 'you@example.com' } },
  { type: 'submit',                  props: { label: 'Gửi' } }
]

const getComponent = (type) => {
  const map = { text: TextInput, number: NumberInput, select: SelectInput, submit: Submit }
  return map[type] ?? null
}

const dynComp = shallowRef(null)
const loadHeavy = () => {
  dynComp.value = defineAsyncComponent(() => import('../components/Contact.vue'))
}

const { count, increment, decrement } = useCounter()

const authStore = useAuthStore()
const userStore = useUserStore()
const { user, token } = storeToRefs(authStore)

onMounted(() => {
  // if (!user.value) auth.login({ user: { name: 'Trương Hoàng Ân' }, token: 'abc123' })
  userStore.fetchUser()
})
</script>


<template>
  <div>
    <DefaultLayout>
      <Header />

      <!-- WELCOME -->
      <div class="welcome">
<!--        <span v-if="user" class="welcome-text">-->
<!--          👋 Welcome, <strong>{{ user.name }}</strong>-->
<!--        </span>-->
        <span v-if="userStore.loading">Loading...</span>
        <span v-else="user" class="welcome-text">
          👋 Welcome, <strong>{{ userStore.profile?.name }}</strong>
        </span>
<!--        <div v-else>-->
<!--          <p>Welcome, {{ userStore.profile?.name }}</p>-->
<!--        </div>-->
      </div>

      <!-- FORM -->
      <div class="form-wrapper">
        <p class="form-title">📋 Điền thông tin của bạn</p>
        <form @submit.prevent="submit" class="form-card">
          <template v-for="(item, i) in layout" :key="i">
            <component
                v-if="item.type !== 'submit'"
                :is="getComponent(item.type)"
                v-model="form[item.key]"
                v-bind="item.props"
            />

            <Submit
                v-else
                :label="item.props.label || 'Submit'"
            />
          </template>
        </form>
      </div>

      <About />
    </DefaultLayout>
  </div>
</template>



<style scoped>
/* 🌤️ Giao diện tổng quan */
:root {
  --card-bg-light: #ffffff;
  --card-bg-dark: #1e293b;
  --text-light: #334155;
  --text-dark: #f3f4f6;
  --primary: #2563eb;
  --primary-dark: #1e40af;
  --shadow-light: rgba(0, 0, 0, 0.07);
  --shadow-dark: rgba(0, 0, 0, 0.4);
}

/* ----------- WELCOME ----------- */
.welcome {
  text-align: center;
  margin-top: 2.5rem;
  margin-bottom: 2rem;
}

.welcome-text {
  font-size: 1.35rem;
  font-weight: 600;
  color: #1e3a8a;
  background: #e0f2fe;
  padding: 0.9rem 2rem;
  border-radius: 9999px;
  box-shadow: 0 3px 10px rgba(30, 64, 175, 0.18);
  transition: all 0.3s ease;
}

.welcome-text:hover {
  transform: translateY(-3px);
}

.dark .welcome-text {
  color: #93c5fd;
  background: rgba(30, 41, 59, 0.7);
  box-shadow: 0 3px 10px rgba(15, 23, 42, 0.5);
}

/* ----------- FORM WRAPPER ----------- */
.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem auto;
  padding: 0 1.5rem;
  width: 100%;
}

.form-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--text-light);
  text-align: center;
  letter-spacing: 0.5px;
  transition: color 0.3s;
}

.dark .form-title {
  color: var(--text-dark);
}

/* ----------- CARD FORM ----------- */
.form-card {
  background: var(--card-bg-light);
  padding: 3rem 3.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 25px var(--shadow-light);
  width: 100%;
  max-width: 820px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

/* hiệu ứng nền gradient mờ */
.form-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 70%),
  radial-gradient(circle at bottom right, rgba(37, 99, 235, 0.05), transparent 70%);
  pointer-events: none;
}

.dark .form-card {
  background: var(--card-bg-dark);
  box-shadow: 0 10px 30px var(--shadow-dark);
}

/* hiệu ứng hover */
.form-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
}

.dark .form-card:hover {
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
}

/* ----------- INPUTS ----------- */
form :deep(input),
form :deep(select) {
  width: 100%;
  padding: 0.95rem 1.1rem;
  margin-bottom: 1.25rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.65rem;
  font-size: 1.05rem;
  background: #f9fafb;
  color: #111827;
  transition: all 0.3s ease;
}

form :deep(input:hover),
form :deep(select:hover) {
  background: #f3f4f6;
}

.dark form :deep(input),
.dark form :deep(select) {
  background: #0f172a;
  color: #f9fafb;
  border-color: #334155;
}

form :deep(input:focus),
form :deep(select:focus) {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.25);
}

/* ----------- BUTTON ----------- */
form :deep(button) {
  width: 100%;
  background: #3b82f6; /* xanh cũ hơn, tươi hơn */
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.7rem 1rem; /* gọn hơn */
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: 0.3px;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25);
}

form :deep(button:hover) {
  background: #2563eb; /* xanh đậm khi hover */
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
}

.dark form :deep(button) {
  background: #3b82f6;
  color: #f9fafb;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}

.dark form :deep(button:hover) {
  background: #60a5fa;
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.4);
}

/* ----------- RESPONSIVE ----------- */
@media (max-width: 768px) {
  .form-card {
    padding: 2rem;
    max-width: 100%;
  }

  .form-title {
    font-size: 1.5rem;
  }

  .welcome-text {
    font-size: 1.1rem;
    padding: 0.7rem 1.4rem;
  }
}



</style>

