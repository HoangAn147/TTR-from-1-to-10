<template>
  <DefaultLayout>
    <Contact />
  </DefaultLayout>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
export default {
  components: {
    Navbar,
    Contact,
    Footer,
    DefaultLayout
  }
}
</script>
