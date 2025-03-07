<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const locations = [
  '서울',
  '부산',
  '대구',
  '인천',
  '대전',
  '울산',
  '세종',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
]

const selectedLocations = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="grid grid-cols-10 gap-4">
    <h3 class="col-span-1 text-lg font-bold dark:text-black3">지역별</h3>
    <div class="col-span-9 flex flex-wrap gap-2">
      <div v-for="location in locations" :key="location">
        <input
          type="checkbox"
          :id="location"
          v-model="selectedLocations"
          :value="location"
          class="hidden"
          @change="emit('update:modelValue', selectedLocations)"
        />
        <label
          :for="location"
          class="text-body1 px-4 py-1 border rounded-full cursor-pointer transition-colors dark:text-black3 dark:border-black3"
          :class="{
            'bg-primaryRed text-white border-primaryRed dark:bg-primaryRed dark:text-black1 dark:border-primaryRed':
              selectedLocations.includes(location),
          }"
        >
          {{ location }}
        </label>
      </div>
    </div>
  </div>
</template>
