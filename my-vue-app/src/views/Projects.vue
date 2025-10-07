<template>
  <DefaultLayout>
    <Projects />
  </DefaultLayout>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Projects from '../components/Projects.vue'
import Footer from '../components/Footer.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
export default {
  components: {
    Navbar,
    Projects,
    Footer,
    DefaultLayout
  }
}
</script>
