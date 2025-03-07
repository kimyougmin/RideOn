<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedStatus = computed(() => props.modelValue)
</script>

<template>
  <div class="flex flex-col gap-4 font-light">
    <span
      class="text-sub-title dark:text-black1 cursor-pointer"
      :class="{ 'font-bold text-primaryRed dark:text-primaryRed': selectedStatus === 'all' }"
      @click="emit('update:modelValue', 'all')"
    >
      전체
    </span>
    <span
      class="text-sub-title dark:text-black1 cursor-pointer"
      :class="{ 'font-bold text-primaryRed dark:text-primaryRed': selectedStatus === 'RECRUITING' }"
      @click="emit('update:modelValue', 'RECRUITING')"
    >
      모집중
    </span>
    <span
      class="text-sub-title dark:text-black1 cursor-pointer"
      :class="{ 'font-bold text-primaryRed dark:text-primaryRed': selectedStatus === 'COMPLETED' }"
      @click="emit('update:modelValue', 'COMPLETED')"
    >
      모집완료
    </span>
  </div>
</template>
