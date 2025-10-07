<template>
  <DefaultLayout>
    <Resume />
  </DefaultLayout>

</template>

<script>
import Navbar from '../components/Navbar.vue'
import Resume from '../components/Resume.vue'
import Footer from '../components/Footer.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
export default {
  components: {
    Navbar,
    Resume,
    Footer,
    DefaultLayout
  }
}
</script>
