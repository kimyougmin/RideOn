import { defineStore } from 'pinia'
import { usePostStore } from '@/composables/usePostStore'
import { RIDEON_FREEBOARD_CHANNEL_ID } from '@/constants/channelId'
import { getFreeboardPosts, updateFreeboardPost } from '@/apis/freeboardApi'
import { likePost, unlikePost } from '@/apis/likeApi'
import { createComment, deleteComment } from '@/apis/commentApi'

const freeBoardStore = usePostStore({
  getPostsApi: getFreeboardPosts,
  updatePostApi: updateFreeboardPost,
  likePostApi: likePost,
  unlikePostApi: unlikePost,
  createCommentApi: createComment,
  deleteCommentApi: deleteComment,
  channelId: RIDEON_FREEBOARD_CHANNEL_ID,
  hasStatus: false,
})

export const useFreeBoardStore = defineStore('freeBoard', {
  state: () => ({
    ...freeBoardStore.state(),
  }),
  actions: {
    ...freeBoardStore.actions,
  },
})
