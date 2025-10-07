<template>
    <DefaultLayout>
        <h1>Your Cart</h1>
        <div v-if="totalItems > 0">
            <ul>
            <li v-for="item in items" :key="item.id">
                {{ item.name }} - Quantity: {{ item.quantity }}
            </li>
            </ul>
            <p>You have {{ totalItems }} items in cart</p>
        </div>
        <div v-else>
            <p>Your cart is empty.</p>
        </div>
    </DefaultLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'

const cart = useCartStore()
const { items, totalItems } = storeToRefs(cart)
onMounted(() => {
    cart.fetchCart(
        { items: [{ id: 1, name: 'Product A', quantity: 2 }, { id: 2, name: 'Product B', quantity: 1 }], totalItems: 3 }
    )
})

</script>

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