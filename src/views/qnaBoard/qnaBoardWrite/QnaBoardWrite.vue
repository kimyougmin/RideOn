<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import { ref } from 'vue'

const tags = ref([])
const tagInput = ref('')

const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !tags.value.includes(tag) && tags.value.length < 10) {
    tags.value.push(tag)
    tagInput.value = ''
  }
}

const removeTag = (index) => {
  tags.value.splice(index, 1)
}

const handleKeydown = (e) => {
  if (e.key === 'Backspace' && tagInput.value === '' && tags.value.length > 0) {
    tags.value.pop()
  }
}

const handleSubmit = (e) => {
  e.preventDefault()
}
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <section class="w-[1440px] px-[463px] mx-auto pt-10 flex flex-col gap-8 mb-12">
      <h2 class="text-title font-bold text-black9 dark:text-black1">질문 작성</h2>
      <form class="flex flex-col gap-6" @submit="handleSubmit">
        <input
          type="text"
          id="title"
          class="w-full text-2xl font-bold dark:caret-black1 dark:text-black1 outline-none"
          placeholder="제목을 입력해주세요."
        />
        <div class="flex flex-wrap gap-2 items-center">
          <span
            v-for="(tag, index) in tags"
            :key="index"
            class="bg-black2 text-black10 px-2 py-1 rounded dark:bg-black7 dark:text-black1"
          >
            {{ tag }}
            <button type="button" @click="removeTag(index)" class="text-sm">&times;</button>
          </span>
          <input
            v-model="tagInput"
            type="text"
            id="tag_search"
            @keydown.enter.prevent="addTag"
            @keydown="handleKeydown"
            class="py-1 outline-none bg-transparent dark:caret-black1 dark:text-black1 flex-1"
            placeholder="태그를 설정하세요. (최대 10개)"
          />
        </div>
        <textarea
          id="content"
          class="w-full border border-black4 rounded-lg py-3 px-4 dark:bg-black8 dark:caret-black1"
          rows="20"
          placeholder="내용을 입력해주세요."
        ></textarea>

        <div class="flex flex-col gap-4">
          <button type="submit" class="px-6 py-2 rounded text-black1 bg-primaryRed">등록</button>
          <button
            type="button"
            class="px-6 py-2 rounded text-black10 bg-black2 dark:text-black1 dark:bg-black6"
            @click="$router.go(-1)"
          >
            취소
          </button>
        </div>
      </form>
    </section>
    <BasicFooter />
  </div>
</template>

<style scoped></style>
