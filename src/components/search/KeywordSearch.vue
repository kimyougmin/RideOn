<template>
  <article class="flex gap-4 items-stretch dark:bg-black8">
    <div class="flex items-center gap-2 border border-black4 px-4 py-2 rounded">
      <label for="keyword_search">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 14L19 19"
            stroke="black-10"
            class="stroke-black10 dark:stroke-black1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3 9.5C3 13.0899 5.91015 16 9.5 16C11.2981 16 12.9256 15.27 14.1023 14.0901C15.275 12.9143 16 11.2918 16 9.5C16 5.91015 13.0899 3 9.5 3C5.91015 3 3 5.91015 3 9.5Z"
            stroke="black-10"
            class="stroke-black10 dark:stroke-black1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </label>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="text"
        id="keyword_search"
        @keydown.enter="handleSearch"
        class="outline-none bg-transparent dark:caret-black1 dark:text-black1 flex-1"
        placeholder="제목, 내용, 작성자명으로 검색"
      />
    </div>
    <button
      class="w-32 font-bold bg-black8 py-4 rounded text-black1 dark:bg-black1 dark:text-black9"
      @click="handleSearch"
    >
      검색
    </button>
  </article>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'search'])

const handleSearch = () => {
  emit('search', props.modelValue)
}
</script>
