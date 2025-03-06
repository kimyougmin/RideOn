<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createFreeboardPost } from '@/apis/freeboardApi'
import { RIDEON_FREEBOARD_CHANNEL_ID } from '@/constants/channelId'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const title = ref('')
const content = ref('')
const titleError = ref('')
const contentError = ref('')
const tags = ref([])
const tagInput = ref('')
const thumbnailPreview = ref(null)
const imageFile = ref(null)
const isLoading = ref(false)

const userStore = useUserStore()

const addTag = (e) => {
  if (e.key === 'Enter' && tagInput.value.trim()) {
    if (tags.value.length < 10) {
      const trimmedTag = tagInput.value.trim()
      if (!tags.value.includes(trimmedTag)) {
        tags.value.push(trimmedTag)
        tagInput.value = ''
      } else {
        alert('이미 존재하는 태그입니다.')
      }
    } else {
      alert('태그는 최대 10개까지만 입력 가능합니다.')
    }
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

const resetFilters = () => {
  tags.value = []
  tagInput.value = ''
}

const handleThumbnailUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    imageFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      thumbnailPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    imageFile.value = null
    thumbnailPreview.value = null
  }
}

const validateFields = () => {
  let isValid = true

  if (!title.value.trim()) {
    titleError.value = '제목을 입력해주세요.'
    isValid = false
  } else {
    titleError.value = ''
  }

  if (!content.value.trim()) {
    contentError.value = '내용을 입력해주세요.'
    isValid = false
  } else {
    contentError.value = ''
  }

  return isValid
}

const handleSubmit = async () => {
  if (!userStore.isLoggedIn) {
    alert('로그인 후 이용해주세요.')
    router.push('/login')
    return
  }

  if (!validateFields()) {
    return
  }

  try {
    isLoading.value = true
    const postData = {
      title: title.value,
      content: content.value,
      tags: tags.value,
      channelId: RIDEON_FREEBOARD_CHANNEL_ID,
      image: imageFile.value,
    }

    await createFreeboardPost(postData)
    alert('게시글이 작성되었습니다.')
    router.push('/freeBoard')
  } catch (error) {
    console.error(error)
    alert('게시글 생성중 오류가 발생했습니다.')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <main class="w-[1440px] px-[93px] mx-auto pt-10 gap-4 mb-24 grid grid-cols-12">
      <section class="col-start-3 col-end-11">
        <h2 class="text-title font-bold text-black9 dark:text-black1 mb-6">게시글 작성</h2>
        <form class="grid grid-cols-8 gap-4" @submit.prevent="handleSubmit">
          <article class="col-span-5 flex flex-col gap-8">
            <!-- 제목 입력 -->
            <div class="flex flex-col gap-3">
              <label for="title" class="text-body1 font-light dark:text-black1"
                >제목 <strong class="text-primaryRed">*</strong></label
              >
              <input
                v-model="title"
                type="text"
                id="title"
                class="w-full border border-black4 rounded-lg py-3 px-4 dark:bg-black8 dark:text-black1 dark:caret-black1"
                :class="{ 'border-primaryRed': titleError }"
                placeholder="제목을 입력해주세요."
              />
              <span v-if="titleError" class="text-primaryRed text-sm">{{ titleError }}</span>
            </div>

            <!-- 내용 입력 -->
            <div class="flex flex-col gap-3">
              <label for="content" class="text-body1 font-light dark:text-black1"
                >내용 <strong class="text-primaryRed">*</strong></label
              >
              <textarea
                v-model="content"
                id="content"
                class="w-full border border-black4 rounded-lg py-3 px-4 dark:bg-black8 dark:text-black1 dark:caret-black1"
                :class="{ 'border-primaryRed': contentError }"
                rows="20"
                placeholder="내용을 입력해주세요."
              ></textarea>
              <span v-if="contentError" class="text-primaryRed text-sm">{{ contentError }}</span>
            </div>
          </article>
          <article class="col-span-3 flex flex-col gap-8 self-start">
            <!-- 태그 입력 -->
            <div class="flex flex-col gap-3">
              <div class="flex flex-col gap-3">
                <label for="tags" class="text-body1 font-light dark:text-black1"
                  >태그 (최대 10개)</label
                >
                <div
                  class="flex flex-wrap gap-2 items-center w-full border border-black4 rounded-lg py-3 px-4 dark:bg-black8 dark:text-black1"
                >
                  #
                  <span
                    v-for="(tag, index) in tags"
                    :key="index"
                    class="bg-black2 text-black10 px-2 rounded dark:bg-black7 dark:text-black1"
                  >
                    {{ tag }}
                    <button type="button" @click="removeTag(index)" class="text-sm">&times;</button>
                  </span>

                  <input
                    v-model="tagInput"
                    type="text"
                    id="tags"
                    @keydown.enter.prevent="addTag"
                    @keydown="handleKeydown"
                    class="outline-none bg-transparent dark:caret-black1 dark:text-black1 flex-1"
                    placeholder="태그를 입력해주세요."
                  />
                </div>
              </div>
              <button
                v-if="tags.length > 0"
                type="button"
                class="w-full bg-black2 py-2 rounded text-black9 dark:bg-black7 dark:text-black1"
                @click="resetFilters"
              >
                <div class="flex items-center justify-center gap-2">
                  <svg
                    width="20"
                    height="20"
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
            </div>

            <!-- 썸네일 업로드 -->
            <div class="flex flex-col gap-3">
              <label class="text-body1 font-light dark:text-black1">썸네일</label>
              <div
                class="relative w-full h-48 bg-black3 rounded-lg dark:bg-black7 flex items-center justify-center cursor-pointer overflow-hidden"
              >
                <input
                  type="file"
                  id="thumbnail"
                  accept="image/*"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                  @change="handleThumbnailUpload"
                />
                <template v-if="!thumbnailPreview">
                  <p
                    class="mt-2 text-black9 dark:text-black1 px-4 py-2 bg-black2 rounded dark:bg-black6"
                  >
                    이미지 업로드
                  </p>
                </template>
                <img v-else :src="thumbnailPreview" class="w-full h-full object-cover" />
              </div>
            </div>

            <!-- 저장 & 취소 버튼 -->
            <div class="flex flex-col gap-4">
              <button
                type="submit"
                class="px-6 py-2 rounded text-black1 bg-primaryRed"
                :disabled="isLoading"
              >
                {{ isLoading ? '저장중...' : '저장' }}
              </button>
              <button
                type="button"
                class="px-6 py-2 rounded text-black10 bg-black2 dark:text-black1 dark:bg-black6"
                @click="$router.go(-1)"
              >
                취소
              </button>
            </div>
          </article>
        </form>
      </section>
    </main>
    <BasicFooter />
  </div>
</template>
