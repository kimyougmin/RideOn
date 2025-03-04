<template>
  <div class="flex gap-4 text-sub-body1">
    <button
      v-for="option in sortOptions"
      :key="option.value"
      class="text-black10 dark:text-black1"
      :class="{ 'font-bold': modelValue === option.value }"
      @click="$emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue'])

const sortOptions = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'views', label: '조회순' },
]
</script>
