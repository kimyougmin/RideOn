import { defineStore } from 'pinia'
import { usePostStore } from '@/composables/usePostStore'
import { RIDEON_FREEBOARD_CHANNEL_ID } from '@/constants/channelId'
import {
  getFreeboardPosts,
  updateFreeboardPost,
  likeFreeboardPost,
  unlikeFreeboardPost,
} from '@/apis/freeboardApi'

export const useFreeBoardStore = defineStore(
  'freeBoard',
  usePostStore({
    getPostsApi: getFreeboardPosts,
    updatePostApi: updateFreeboardPost,
    likePostApi: likeFreeboardPost,
    unlikePostApi: unlikeFreeboardPost,
    channelId: RIDEON_FREEBOARD_CHANNEL_ID,
    hasImageUpload: true,
    hasStatus: false,
  }),
)
