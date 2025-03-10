<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: Object,
  isLiked: Boolean,
  goToDetail: Function,
})

const emit = defineEmits(['toggle-like'])

const formattedPrice = computed(() => {
  return Intl.NumberFormat('ko-KR').format(Number(props.item?.lprice || 0))
})
</script>

<template>
  <div class="flex flex-col cursor-pointer">
    <div class="w-full h-[250px]">
      <img
        :src="item.image"
        :alt="item.title"
        class="w-full h-full object-cover border border-b-0 border-gray-400"
        @click="goToDetail(item)"
      />
    </div>
    <div class="flex gap-4 p-4 bg-white border border-gray-400">
      <div class="w-3/4 flex flex-col">
        <p class="m-0 mb-1 text-body1 text-black7">{{ item.mallName }}</p>
        <p class="m-0 mb-2 text-sub-title font-bold text-black truncate" @click="goToDetail(item)">
          {{ item.title.replace(/<\/?[^>]+(>|$)/g, '') }}
        </p>
        <p class="m-0 text-2xl font-bold text-black">{{ formattedPrice }}원</p>
      </div>
      <img
        :src="isLiked ? '/riderPageImage/fullHeart.svg' : '/riderPageImage/emptyHeart.svg'"
        alt="하트"
        class="w-5 h-5 transition-all duration-200"
        @click.stop="emit('toggle-like', item)"
      />
    </div>
  </div>
</template>
