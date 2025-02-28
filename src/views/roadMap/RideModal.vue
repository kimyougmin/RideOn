<script setup>
import { ref } from 'vue';
const riderModal = ref(false);

const toggleModal = () => {
  riderModal.value = !riderModal.value;
};

</script>

<template>
  <div>
    <button @click="toggleModal" class="w-12 h-12 bg-black1 dark:bg-black9  text-black rounded-full flex items-center 
    justify-center absolute top-20 left-14 shadow-xl hover:scale-110 transition-transform duration-200">
    <span v-if="riderModal">
    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
  <path d="M20,5 L10,15 L20,25" class="stroke-black dark:stroke-white" stroke-width="2" fill="none"/>
</svg></span>
<span v-else>
<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
  <path d="M10,5 L20,15 L10,25" class="stroke-black dark:stroke-white" stroke-width="2" fill="none"/>
</svg></span>


</button>
    <div v-if="riderModal" class="absolute w-96 h-[700px] bg-black1 rounded-3xl dark:bg-black9 
    left-12 top-36 shadow-2xl">
    </div>
  </div>
</template>
