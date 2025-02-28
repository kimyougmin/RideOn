<script setup>
defineEmits(['submit'])
</script>

<template>
  <div class="flex gap-4">
    <div
      class="flex items-center gap-2 border border-black4 px-5 py-3 rounded bg-black1 dark:bg-black9"
    >
      <input
        type="text"
        class="outline-none bg-transparent dark:caret-black1 dark:text-black1 w-full"
        placeholder="내용을 입력해주세요."
      />
    </div>
    <button
      class="w-28 font-bold bg-black8 py-3 rounded text-black1 dark:bg-black3 dark:text-black9"
    >
      등록
    </button>
  </div>
</template>
