<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRiderCrewBoardStore } from '@/stores/riderCrewBoard'
import { useUserStore } from '@/stores/user'

const CONTENT_PLACEHOLDER =
  '[라이딩 모집 내용 예시]\n\n라이딩 날짜 : 2025-01-01\n예상 코스 : 서울 홍대 - 경기 양주\n예상 모집인원 : 3명\n라이딩 목표 : 초보자도 쉽게 참여 가능\n라이딩 관련 주의사항 : 안전장비 착용 필수'

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

const memberCounts = [
  { value: 0, label: '전체' },
  { value: 1, label: '1명' },
  { value: 2, label: '2명' },
  { value: 3, label: '3명' },
  { value: 4, label: '4명' },
  { value: 5, label: '5명 이상' },
]

const router = useRouter()
const route = useRoute()
const riderCrewStore = useRiderCrewBoardStore()
const userStore = useUserStore()

// 폼 데이터
const title = ref('')
const content = ref('')
const selectedLocation = ref('')
const selectedMemberCount = ref(null)
const customMemberCount = ref(null)

const imageFile = ref(null)
const thumbnailPreview = ref(null)
const imageToDeletePublicId = ref('')
const isDeleteImage = ref(false)

const isSubmitting = ref(false)
const errorMessage = ref('')

const postId = route.params.id

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

const handleDeleteImage = () => {
  thumbnailPreview.value = null
  imageFile.value = null
  isDeleteImage.value = true
}

const validateForm = () => {
  if (!title.value.trim()) {
    errorMessage.value = '제목을 입력해주세요.'
    return false
  }

  if (!content.value.trim()) {
    errorMessage.value = '내용을 입력해주세요.'
    return false
  }

  if (!selectedLocation.value) {
    errorMessage.value = '지역을 선택해주세요.'
    return false
  }

  if (selectedMemberCount.value === null) {
    errorMessage.value = '모집 인원을 선택해주세요.'
    return false
  }

  if (
    selectedMemberCount.value === 5 &&
    (!customMemberCount.value || customMemberCount.value < 5)
  ) {
    errorMessage.value = '5명 이상 선택 시 정확한 인원을 입력해주세요.'
    return false
  }

  return true
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const memberCount =
      selectedMemberCount.value === 5 ? customMemberCount.value : selectedMemberCount.value

    const user = {
      _id: userStore.user._id,
      name: userStore.user.name,
      email: userStore.user.email,
    }

    const memberInfo = {
      members: [user],
      current: 1,
      max: memberCount,
    }

    const postData = {
      id: postId,
      title: title.value,
      content: content.value,
      location: selectedLocation.value,
      image: imageFile.value || thumbnailPreview.value,
      imageToDeletePublicId: isDeleteImage.value ? imageToDeletePublicId.value : '',
      memberInfo,
    }

    await riderCrewStore.updatePost(postData)
    alert('모집글이 수정되었습니다.')
    router.push('/riderCrewBoard')
  } catch (error) {
    console.error('라이더 크루 게시글 수정 실패:', error)
    errorMessage.value = '게시글 수정에 실패했습니다. 다시 시도해주세요.'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  try {
    userStore.loadUser()

    const post = await riderCrewStore.fetchPostById(postId)

    if (userStore.user._id !== post.author._id) {
      alert('작성자만 수정할 수 있습니다.')
      router.push('/riderCrewBoard')
      return
    }

    title.value = post.title
    content.value = post.content
    selectedLocation.value = post.location
    selectedMemberCount.value = post.memberInfo.max

    imageToDeletePublicId.value = post.imagePublicId

    if (post.image) {
      thumbnailPreview.value = post.image
    }
  } catch (error) {
    console.error('게시글 불러오기 실패:', error)
    alert('게시글을 불러오는데 실패했습니다.')
    router.push('/riderCrewBoard')
  }
})
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <main class="w-[1440px] px-[93px] mx-auto pt-10 gap-4 mb-24 grid grid-cols-12">
      <section class="col-start-3 col-end-11">
        <h2 class="text-title font-bold text-black9 dark:text-black1 mb-6">라이더 모집글 수정</h2>

        <!-- 에러 메시지 표시 -->
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {{ errorMessage }}
        </div>

        <form class="grid grid-cols-8 gap-4" @submit.prevent="handleSubmit">
          <article class="col-span-5 flex flex-col gap-8 h-fit">
            <!-- 제목 입력 -->
            <div class="flex flex-col gap-3">
              <label for="title" class="text-body1 font-light dark:text-black1"
                >제목 <strong class="text-primaryRed">*</strong></label
              >
              <input
                type="text"
                id="title"
                v-model="title"
                class="w-full border border-black4 rounded-lg py-3 px-4 dark:bg-black8 dark:caret-black1 dark:text-black1"
                placeholder="제목을 입력해주세요."
              />
            </div>

            <!-- 내용 입력 -->
            <div class="flex flex-col gap-3">
              <label for="content" class="text-body1 font-light dark:text-black1"
                >내용 <strong class="text-primaryRed">*</strong></label
              >
              <textarea
                id="content"
                v-model="content"
                class="w-full border border-black4 rounded-lg py-3 px-4 dark:bg-black8 dark:caret-black1 dark:text-black1"
                rows="20"
                :placeholder="CONTENT_PLACEHOLDER"
              ></textarea>
            </div>
          </article>
          <article class="col-span-3 flex flex-col gap-8 self-start">
            <!-- 지역 선택 -->
            <div class="flex flex-col gap-3">
              <label class="text-body1 font-light dark:text-black1"
                >지역 (택 1) <strong class="text-primaryRed">*</strong></label
              >
              <div class="flex flex-wrap gap-2">
                <div v-for="location in locations" :key="location">
                  <input
                    type="radio"
                    :id="location"
                    v-model="selectedLocation"
                    :value="location"
                    class="hidden"
                    name="location"
                  />
                  <label
                    :for="location"
                    class="text-body1 px-4 py-1 border rounded-full cursor-pointer transition-colors dark:text-black3 dark:border-black3"
                    :class="{
                      'bg-primaryRed text-white border-primaryRed dark:bg-primaryRed dark:text-black1 dark:border-primaryRed':
                        selectedLocation === location,
                    }"
                  >
                    {{ location }}
                  </label>
                </div>
              </div>
            </div>

            <!-- 인원 선택 -->
            <div class="flex flex-col gap-3">
              <label class="text-body1 font-light dark:text-black1"
                >인원 (택 1) <strong class="text-primaryRed">*</strong></label
              >
              <div class="flex flex-wrap gap-2">
                <div v-for="count in memberCounts" :key="count.value">
                  <input
                    type="radio"
                    :id="'member-count-' + count.value"
                    v-model="selectedMemberCount"
                    :value="count.value"
                    class="hidden"
                    name="memberCount"
                  />
                  <label
                    :for="'member-count-' + count.value"
                    class="text-body1 px-4 py-1 border rounded-full cursor-pointer transition-colors dark:text-black3 dark:border-black3"
                    :class="{
                      'bg-primaryRed text-white border-primaryRed dark:bg-primaryRed dark:text-black1 dark:border-primaryRed':
                        selectedMemberCount === count.value,
                    }"
                  >
                    {{ count.label }}
                  </label>
                </div>
              </div>
              <!-- 5명 이상 선택시 나타나는 입력 필드 -->
              <div v-if="selectedMemberCount === 5" class="mt-2">
                <input
                  type="number"
                  v-model="customMemberCount"
                  min="5"
                  placeholder="모집 인원을 입력해주세요"
                  class="w-full border border-black4 rounded-lg py-2 px-4 dark:bg-black8 dark:caret-black1 dark:text-black1"
                />
              </div>
            </div>

            <!-- 썸네일 업로드 -->
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <label class="text-body1 font-light dark:text-black1">썸네일</label>
                <button
                  type="button"
                  class="text-sm bg-black2 dark:text-black1 dark:bg-black7 rounded-lg px-2 py-1"
                  @click="handleDeleteImage"
                >
                  이미지 삭제
                </button>
              </div>
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
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? '저장 중...' : '저장' }}
              </button>
              <button
                type="button"
                class="px-6 py-2 rounded text-black10 bg-black2 dark:text-black1 dark:bg-black6"
                @click="$router.go(-1)"
                :disabled="isSubmitting"
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
