import { defineStore } from 'pinia'
import { usePostStore } from '@/composables/usePostStore'
import { RIDEON_RIDERCREW_CHANNEL_ID } from '@/constants/channelId'
import { getRiderCrewPosts, updateRiderCrewPost } from '@/apis/riderCrewApi'
import { likePost, unlikePost } from '@/apis/likeApi'
import { createComment, deleteComment } from '@/apis/commentApi'
import { useUserStore } from '@/stores/user'

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

    async joinCrew(crewId) {
      try {
        // 현재 게시글 정보 가져오기
        const crew = await this.fetchPostById(crewId, true)

        // 사용자 정보 가져오기 (Pinia 스토어 간 접근)
        const userStore = useUserStore()
        const currentUser = userStore.user

        // 이미 참여한 멤버인지 확인
        const memberExists = crew.memberInfo?.members?.some(
          (member) => member._id === currentUser._id || member === currentUser._id,
        )

        if (memberExists) {
          alert('이미 참여한 크루입니다.')
          return crew
        }

        // 모집 인원이 다 찼는지 확인
        if (crew.memberInfo.current >= crew.memberInfo.max) {
          alert('모집 인원이 마감되었습니다.')
          return crew
        }

        // 현재 사용자 정보
        const user = {
          _id: currentUser._id,
          name: currentUser.name || currentUser.fullName,
          email: currentUser.email,
        }

        // 기존 멤버 목록
        const members = Array.isArray(crew.memberInfo.members) ? [...crew.memberInfo.members] : []

        // 새 멤버 추가
        members.push(user)

        // 로컬 상태만 업데이트 (실제 API 호출 없음)
        const updatedCrew = {
          ...crew,
          memberInfo: {
            ...crew.memberInfo,
            members: members,
            current: members.length,
          },
        }

        // 현재 게시글 상태 업데이트
        if (this.currentPost && this.currentPost._id === crewId) {
          this.currentPost = updatedCrew
        }

        // posts 배열의 해당 게시글도 업데이트
        const postIndex = this.posts.findIndex((post) => post._id === crewId)
        if (postIndex !== -1) {
          this.posts[postIndex] = updatedCrew
        }

        alert(`🥳크루에 참여했습니다! \n (임시 기능: 페이지를 새로고침하면 초기화됩니다)`)
        return updatedCrew
      } catch (error) {
        console.error('크루 참여 실패:', error)
        throw error
      }
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
