<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import { ref } from 'vue'

const thumbnailPreview = ref(null)

// 지역과 멤버 수 상태 추가
const selectedLocation = ref('')
const selectedMemberCount = ref(null)
const customMemberCount = ref(null)

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

const handleThumbnailUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      thumbnailPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    thumbnailPreview.value = null
  }
}

const CONTENT_PLACEHOLDER =
  '[라이딩 모집 내용 예시]\n\n라이딩 날짜 : 2025-01-01\n예상 코스 : 서울 홍대 - 경기 양주\n예상 모집인원 : 3명\n라이딩 목표 : 초보자도 쉽게 참여 가능\n라이딩 관련 주의사항 : 안전장비 착용 필수'
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <main class="w-[1440px] px-[93px] mx-auto pt-10 gap-4 mb-24 grid grid-cols-12">
      <section class="col-start-3 col-end-11">
        <h2 class="text-title font-bold text-black9 dark:text-black1 mb-6">라이더 모집글 작성</h2>
        <form class="grid grid-cols-8 gap-4">
          <article class="col-span-5 flex flex-col gap-8 h-fit">
            <!-- 제목 입력 -->
            <div class="flex flex-col gap-3">
              <label for="title" class="text-body1 font-light dark:text-black1"
                >제목 <strong class="text-primaryRed">*</strong></label
              >
              <input
                type="text"
                id="title"
                class="w-full border border-black4 rounded-lg py-3 px-4 dark:bg-black8 dark:caret-black1"
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
                class="w-full border border-black4 rounded-lg py-3 px-4 dark:bg-black8 dark:caret-black1"
                rows="20"
                :placeholder="CONTENT_PLACEHOLDER"
              ></textarea>
            </div>
          </article>
          <article class="col-span-3 flex flex-col gap-8 self-start">
            <!-- 지역 선택 -->
            <div class="flex flex-col gap-3">
              <label class="text-body1 font-light dark:text-black1">지역 (택 1)</label>
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
              <label class="text-body1 font-light dark:text-black1">인원 (택 1)</label>
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
                  class="w-full border border-black4 rounded-lg py-2 px-4 dark:bg-black8 dark:caret-black1"
                />
              </div>
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
              <button type="submit" class="px-6 py-2 rounded text-black1 bg-primaryRed">
                저장
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
