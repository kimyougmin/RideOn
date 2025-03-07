<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: Object,
  isLiked: Boolean,
  goToDetail: Function,
})

const formattedPrice = computed(() => {
  return Intl.NumberFormat('ko-KR').format(Number(props.item?.lprice || 0))
})

</script>

<template>
  <div class="flex flex-col cursor-pointer" @click="goToDetail(item)">
    <div class="w-full h-[350px]">
      <img
        :src="item.image"
        :alt="item.title"
        class="w-full h-full object-cover border border-b-0 border-gray-400"
      />
    </div>
    <div class="flex gap-4 px-8 py-6 bg-white border border-gray-400">
      <div class="w-3/4 flex flex-col gap-2">
        <p class="m-0 text-body1 text-black">{{ item.mallName }}</p>
        <p class="m-0 text-sub-title font-bold text-black truncate">
          {{ item.title.replace(/<\/?[^>]+(>|$)/g, '') }}
        </p>
        <p class="m-0 text-2xl font-bold text-black">{{ formattedPrice }}원</p>
      </div>
      <img
        :src="isLiked ? '/riderPageImage/fullHeart.svg' : '/riderPageImage/emptyHeart.svg'"
        alt="하트"
        class="w-6 h-6 transition-all duration-200"
      />
    </div>
  </div>
</template>

