<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const commentText = ref('')

defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
})

const handleSubmit = async () => {
  if (!commentText.value.trim()) return

  try {
    emit('submit', commentText.value)
    commentText.value = ''
  } catch (error) {
    console.error('댓글 생성 실패:', error)
  }
}
</script>

<template>
  <div class="flex gap-4">
    <div
      class="flex items-center gap-2 border border-black4 px-5 py-3 rounded bg-black1 dark:bg-black9"
    >
      <input
        v-model="commentText"
        type="text"
        @keyup.enter="handleSubmit"
        class="outline-none bg-transparent dark:caret-black1 dark:text-black1 w-full"
        placeholder="내용을 입력해주세요."
      />
    </div>
    <button
      @click="handleSubmit"
      :disabled="isLoading"
      class="w-28 font-bold bg-black8 py-3 rounded text-black1 dark:bg-black3 dark:text-black9"
    >
      등록
    </button>
  </div>
</template>
