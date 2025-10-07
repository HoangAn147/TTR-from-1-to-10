<template>
  <!-- Navigation-->
  <nav class="navbar navbar-expand-lg navbar-light py-3">
    <div class="container px-5">
      <a class="navbar-brand" href="/">
        <span class="fw-bolder text-primary">Start Bootstrap</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
          <router-link to="/" class="nav-link">{{ $t('navbar.home') }}</router-link>
          <router-link to="/resume" class="nav-link">{{ $t('navbar.resume') }}</router-link>
          <router-link to="/projects" class="nav-link">{{ $t('navbar.projects') }}</router-link>
          <router-link to="/contact" class="nav-link">{{ $t('navbar.contact') }}</router-link>
        </ul>
      </div>
      <button @click="$i18n.locale = 'vi'">VI</button>
      <button @click="$i18n.locale = 'en'">EN</button>
      <button @click="theme.toggleDark()">{{ theme.isDark ? 'Light' : 'Dark' }} Mode</button>
    </div>
  </nav>
</template>

<script setup>
import { useThemeStore } from '../stores/theme'
const theme = useThemeStore()
</script>

<script>
  export default { name: 'Navbar' }
</script>