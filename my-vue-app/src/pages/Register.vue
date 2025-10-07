<template>
  <DefaultLayout>
    <form @submit.prevent="onSubmit">
      <FormInput label="Full Name" v-model="name" :error="errors.name" />
      <FormInput
        label="Email"
        v-model="email"
        :error="errors.email"
        type="email"
      />
      <FormInput
        label="Password"
        v-model="password"
        :error="errors.password"
        type="password"
      />
      <FormInput
        label="Confirm Password"
        v-model="confirmPassword"
        :error="errors.confirmPassword"
        type="password"
      />

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full py-2 bg-green-600 rounded hover:bg-green-700"
      >
        {{ isSubmitting ? "Registering..." : "Register" }}
      </button>
    </form>
  </DefaultLayout>
</template>

<script setup>
import FormInput from "../components/FormInput.vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useApi } from "../composables/useApi";
import { useToast } from "../composables/useToast";
import DefaultLayout from '../layouts/DefaultLayout.vue'


const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
});
const { value: name } = useField("name");
const { value: email } = useField("email");
const { value: password } = useField("password");
const { value: confirmPassword } = useField("confirmPassword");

const { post } = useApi();
const toast = useToast();

const onSubmit = handleSubmit(async (values) => {
  try {
    const res = await post("/api/register", values);
    toast.success("Đăng ký thành công!");
  } catch (err) {
    toast.error(err?.message || "Đăng ký thất bại");
  }
});
</script>
