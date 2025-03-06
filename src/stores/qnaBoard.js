import { defineStore } from 'pinia'
import { usePostStore } from '@/composables/usePostStore'
import { RIDEON_QNA_CHANNEL_ID } from '@/constants/channelId'
import { getQnaPosts, updateQnaPost, likeQnaPost, unlikeQnaPost } from '@/apis/qnaApi'

// 기본 스토어 설정에 status 관련 상태 추가
const qnaStore = usePostStore({
  getPostsApi: getQnaPosts,
  updatePostApi: updateQnaPost,
  likePostApi: likeQnaPost,
  unlikePostApi: unlikeQnaPost,
  channelId: RIDEON_QNA_CHANNEL_ID,
  hasStatus: true,
})

export const useQnaBoardStore = defineStore('qnaBoard', {
  state: () => ({
    ...qnaStore.state(),
  }),

  actions: {
    ...qnaStore.actions,
  },
})
