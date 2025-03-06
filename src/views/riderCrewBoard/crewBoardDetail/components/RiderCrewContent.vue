<script setup>
defineProps({
  riderCrew: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="flex gap-3 flex-col items-baseline">
    <h2 class="text-title font-bold text-black9 dark:text-black1">{{ riderCrew.title }}</h2>
    <div class="w-full pr-4 flex justify-between items-center">
      <span class="text-black6 dark:text-black4">
        {{
          new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }).format(new Date(riderCrew.createdAt))
        }}
        작성
      </span>
      <span class="text-black9 dark:text-black1">
        {{ riderCrew.memberInfo.current }} / {{ riderCrew.memberInfo.max }}
      </span>
    </div>
  </div>
  <div class="flex flex-col gap-4">
    <div class="py-2 text-center border-2 border-primaryRed rounded">
      <span class="text-sub-title font-bold text-primaryRed">
        남은 자리 {{ riderCrew.memberInfo.max - riderCrew.memberInfo.current }}개
      </span>
    </div>
    <div v-if="riderCrew.image" class="w-full h-[400px] overflow-hidden rounded-lg">
      <img :src="riderCrew.image" alt="placeholder" class="w-full h-full object-cover" />
    </div>

    <p class="m-0 text-body1 dark:text-black3 leading-loose whitespace-pre-wrap">
      {{ riderCrew.content }}
    </p>
    <div class="flex items-center gap-3">
      <span
        v-for="location in riderCrew.locations"
        :key="location"
        class="text-body2 bg-black2 text-black10 px-4 py-1 rounded dark:bg-black7 dark:text-black1"
      >
        {{ location }}
      </span>
    </div>
  </div>
</template>
