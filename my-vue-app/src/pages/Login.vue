<script setup>
import FormInput from "../components/FormInput.vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { ref, onMounted, watch } from "vue";

const schema = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Bắt buộc"),
  password: yup.string().min(6, "Tối thiểu 6 ký tự").required("Bắt buộc"),
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
});
const { value: email } = useField("email");
const { value: password } = useField("password");

const onSubmit = handleSubmit(async (values) => {
  console.log("Submit:", values);
  await new Promise((r) => setTimeout(r, 800));
  alert("✅ Logged in!");
});

const rememberMe = ref(false)
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

onMounted(() => {
  const savedEmail = localStorage.getItem('rememberedEmail')
  if (savedEmail) email.value = savedEmail
})

watch(email, (val) => {
  if (rememberMe.value) {
    localStorage.setItem('rememberedEmail', val)
  } else {
    localStorage.removeItem('rememberedEmail')
  }
})

</script>

<template>
  <DefaultLayout>
    <form @submit.prevent="onSubmit">
      <FormInput
        label="Email"
        v-model="email"
        :error="errors.email"
        type="email"
        placeholder="you@example.com"
      />
      <FormInput
        label="Password"
        v-model="password"
        :error="errors.password"
        :type="showPassword ? 'text' : 'password'"
      />

      <div class="flex items-center justify-between mb-4">
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" v-model="rememberMe" class="accent-blue-500" />
          Remember me
        </label>

        <button
          type="button"
          class="text-blue-600 text-sm"
          @click="togglePassword"
        >
          {{ showPassword ? "Hide" : "Show" }} Password
        </button>
      </div>
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Logging in…" : "Login" }}
      </button>
    </form>
  </DefaultLayout>
</template>
