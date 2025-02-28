<template>
  <article class="flex gap-4 items-stretch dark:bg-black8">
    <div class="flex items-start gap-3 border border-black4 px-4 py-3 rounded">
      <label for="tag_search" class="mt-1">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.33333 3.5L5 18.5"
            stroke="black-10"
            class="stroke-black10 dark:stroke-black1"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M17.083 14.334H2.08301"
            stroke="black-10"
            class="stroke-black10 dark:stroke-black1"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M18.333 6.83398H3.33301"
            stroke="black-10"
            class="stroke-black10 dark:stroke-black1"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M15.0003 3.5L11.667 18.5"
            stroke="black-10"
            class="stroke-black10 dark:stroke-black1"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </label>
      <div class="flex flex-wrap gap-2 items-center">
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="bg-black2 text-black10 px-2 py-1 rounded dark:bg-black7 dark:text-black1"
        >
          {{ tag }}
          <button @click="removeTag(index)" class="text-sm">&times;</button>
        </span>
        <input
          v-model="tagInput"
          type="text"
          id="tag_search"
          @keyup.enter="addTag"
          @keydown="handleKeydown"
          class="py-1 outline-none bg-transparent dark:caret-black1 dark:text-black1 flex-1"
          placeholder="태그로 검색해보세요!"
        />
      </div>
    </div>
    <button
      class="min-w-32 bg-black2 py-3 rounded text-black9 dark:bg-black7 dark:text-black1"
      @click="resetFilters"
    >
      <div class="flex items-center justify-center gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.9321 6.66797C16.6461 3.72479 13.7094 1.66797 10.2921 1.66797C5.97106 1.66797 2.4181 4.95687 2 9.16797"
            stroke="black-10"
            class="stroke-black10 dark:stroke-black1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.459 6.66667H18.1256C18.4018 6.66667 18.6257 6.44281 18.6257 6.16667V2.5"
            stroke="black-10"
            class="stroke-black10 dark:stroke-black1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.69336 13.332C3.97929 16.2752 6.91609 18.332 10.3333 18.332C14.6544 18.332 18.2074 15.0431 18.6255 10.832"
            stroke="black-10"
            class="stroke-black10 dark:stroke-black1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.16667 13.332H2.5C2.22386 13.332 2 13.5559 2 13.832V17.4987"
            stroke="black-10"
            class="stroke-black10 dark:stroke-black1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="font-bold">초기화</span>
      </div>
    </button>
  </article>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const tags = ref(props.modelValue)
const tagInput = ref('')

// modelValue가 변경될 때마다 tags를 업데이트하는 watch 추가
watch(
  () => props.modelValue,
  (newValue) => {
    tags.value = newValue
  },
)

const addTag = () => {
  const trimmedTag = tagInput.value.trim()
  if (trimmedTag) {
    // 중복 태그 체크
    if (!tags.value.includes(trimmedTag)) {
      const newTags = [...tags.value, trimmedTag]
      emit('update:modelValue', newTags)
    }
    tagInput.value = ''
  }
}

const removeTag = (index) => {
  const newTags = [...tags.value]
  newTags.splice(index, 1)
  emit('update:modelValue', newTags)
}

const handleKeydown = (e) => {
  if (e.key === 'Backspace' && tagInput.value === '' && tags.value.length > 0) {
    const newTags = [...tags.value]
    newTags.pop()
    emit('update:modelValue', newTags)
  }
}

const resetFilters = () => {
  emit('update:modelValue', [])
  tagInput.value = ''
}
</script>
