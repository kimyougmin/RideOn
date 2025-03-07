import { defineStore } from 'pinia'
import { usePostStore } from '@/composables/usePostStore'
import { RIDEON_RIDERCREW_CHANNEL_ID } from '@/constants/channelId'
import { getRiderCrewPosts, updateRiderCrewPost } from '@/apis/riderCrewApi'
import { likePost, unlikePost } from '@/apis/likeApi'
import { createComment, deleteComment } from '@/apis/commentApi'

const riderCrewStore = usePostStore({
  getPostsApi: getRiderCrewPosts,
  updatePostApi: updateRiderCrewPost,
  likePostApi: likePost,
  unlikePostApi: unlikePost,
  createCommentApi: createComment,
  deleteCommentApi: deleteComment,
  channelId: RIDEON_RIDERCREW_CHANNEL_ID,
  hasStatus: true,
})

export const useRiderCrewBoardStore = defineStore('riderCrew', {
  state: () => ({
    ...riderCrewStore.state(),
  }),

  actions: {
    ...riderCrewStore.actions,

    async joinCrew() {
      alert('크루 참여 기능은 현재 개발 중입니다.')
      throw new Error('크루 참여 기능은 현재 개발 중입니다.')
    },

    filterByKeyword(posts, keyword = '') {
      if (!keyword) return posts
      return posts.filter((post) => {
        const searchFields = [
          post.title.toLowerCase(),
          post.content.toLowerCase(),
          post.author.fullName.toLowerCase(),
        ]
        return searchFields.some((field) => field.includes(keyword.toLowerCase()))
      })
    },

    // 위치 필터링 함수
    filterByLocations(posts, locations = []) {
      if (locations.length === 0) return posts
      return posts.filter((post) => {
        const postLocation = post.location || ''
        return locations.includes(postLocation)
      })
    },

    // 멤버 수 필터링 함수
    filterByMemberCount(posts, memberCounts = []) {
      if (memberCounts.length === 0 || memberCounts.includes(0)) return posts

      return posts.filter((post) => {
        const maxMembers = post.maxMemberCount || post.memberInfo?.max || 0

        return memberCounts.some((count) => {
          if (count === 1) return maxMembers === 1
          if (count === 2) return maxMembers === 2
          if (count === 3) return maxMembers === 3
          if (count === 4) return maxMembers === 4
          if (count === 5) return maxMembers >= 5
          return false
        })
      })
    },

    // 상태 필터링 함수 오버라이드
    filterByStatus(posts, status = 'all') {
      if (status === 'all') return posts
      return posts.filter((post) => post.status === status)
    },

    // 라이더 크루 게시물 필터링 함수
    filterPosts(
      keyword = '',
      locations = [],
      memberCounts = [],
      sortBy = 'latest',
      status = 'all',
    ) {
      try {
        let filteredPosts = [...this.posts]
        filteredPosts = this.filterByKeyword(filteredPosts, keyword)
        filteredPosts = this.filterByLocations(filteredPosts, locations)
        filteredPosts = this.filterByMemberCount(filteredPosts, memberCounts)
        filteredPosts = this.filterByStatus(filteredPosts, status)
        return this.sortPosts(filteredPosts, sortBy)
      } catch (error) {
        console.error('라이더 크루 게시글 필터링 실패:', error)
        return []
      }
    },
  },
})
