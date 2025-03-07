<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const memberCounts = [
  { value: 0, label: '전체' },
  { value: 1, label: '1명' },
  { value: 2, label: '2명' },
  { value: 3, label: '3명' },
  { value: 4, label: '4명' },
  { value: 5, label: '5명 이상' },
]

const selectedCounts = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="grid grid-cols-10 gap-4">
    <h3 class="col-span-1 text-lg font-bold dark:text-black3">인원</h3>
    <div class="col-span-9 flex flex-wrap gap-2">
      <div v-for="count in memberCounts" :key="count.value">
        <input
          type="checkbox"
          :id="'member-count-' + count.value"
          v-model="selectedCounts"
          :value="count.value"
          class="hidden"
        />
        <label
          :for="'member-count-' + count.value"
          class="text-body1 px-4 py-1 border rounded-full cursor-pointer transition-colors dark:text-black3 dark:border-black3"
          :class="{
            'bg-primaryRed text-white border-primaryRed dark:bg-primaryRed dark:text-black1 dark:border-primaryRed':
              selectedCounts.includes(count.value),
          }"
        >
          {{ count.label }}
        </label>
      </div>
    </div>
  </div>
</template>
