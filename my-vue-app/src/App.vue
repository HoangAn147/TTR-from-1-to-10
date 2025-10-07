<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { RouterView } from 'vue-router'
import Home from './views/Home.vue'
import Resume from './views/Resume.vue'
import Projects from './views/Projects.vue'
import Contact from './views/Contact.vue'
import Cart from './views/Cart.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'

export default {
  components: { Home },
  components: { Resume },
  components: { Projects },
  components: { Contact },
  components: { Cart },
  components: { Login },
  components: { Register}
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>