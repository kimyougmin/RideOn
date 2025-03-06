import { defineStore } from 'pinia'
import { usePostStore } from '@/composables/usePostStore'
import { RIDEON_QNA_CHANNEL_ID } from '@/constants/channelId'
import { getQnaPosts, updateQnaPost } from '@/apis/qnaApi'
import { likePost, unlikePost } from '@/apis/likeApi'

const qnaStore = usePostStore({
  getPostsApi: getQnaPosts,
  updatePostApi: updateQnaPost,
  likePostApi: likePost,
  unlikePostApi: unlikePost,
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
