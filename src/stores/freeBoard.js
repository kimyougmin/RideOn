import { defineStore } from 'pinia'

import {
  getFreeboardPosts,
  likeFreeboardPost,
  unlikeFreeboardPost,
  updateFreeboardPost,
} from '@/apis/freeboardApi'
import { RIDEON_FREEBOARD_CHANNEL_ID } from '@/constants/channelId'

export const useFreeBoardStore = defineStore('freeBoard', {
  state: () => ({
    posts: [],
    currentPost: null,
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchPosts() {
      this.isLoading = true
      this.error = null

      try {
        const response = await getFreeboardPosts(RIDEON_FREEBOARD_CHANNEL_ID)
        this.posts = response.map((post) => {
          const parsedTitle = JSON.parse(post.title)
          return {
            ...post,
            ...parsedTitle,
          }
        })
      } catch (error) {
        this.error = '게시글 목록을 불러오는데 실패했습니다.'
        console.error('게시글 목록 조회 실패:', error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchPostById(id) {
      this.isLoading = true
      this.error = null

      try {
        const existingPost = this.posts.find((post) => post._id === id)
        if (existingPost) {
          this.currentPost = existingPost
          return existingPost
        }

        if (this.posts.length === 0) {
          await this.fetchPosts()
          const post = this.posts.find((post) => post._id === id)
          if (post) {
            this.currentPost = post
            return post
          }
        }

        throw new Error('게시글을 찾을 수 없습니다.')
      } catch (error) {
        this.error = error.message || '게시글을 불러오는데 실패했습니다.'
        this.currentPost = null
        throw error
      } finally {
        this.isLoading = false
      }
    },

    filterByKeyword(posts, keyword = '') {
      if (!keyword) return posts
      return posts.filter((post) => {
        const searchFields = [
          post.title.toLowerCase(),
          post.content.toLowerCase(),
          post.author.fullName.toLowerCase(),
          ...post.tags.map((tag) => tag.toLowerCase()),
        ]
        return searchFields.some((field) => field.includes(keyword.toLowerCase()))
      })
    },

    filterByTags(posts, tags = []) {
      if (tags.length === 0) return posts
      return posts.filter((post) =>
        tags.every((tag) => post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())),
      )
    },

    sortPosts(posts, sortBy = 'latest') {
      return [...posts].sort((a, b) => {
        if (sortBy === 'latest') {
          return new Date(b.createdAt) - new Date(a.createdAt)
        }
        if (sortBy === 'mostLiked') {
          return b.likes.length - a.likes.length
        }
        if (sortBy === 'mostComments') {
          return b.comments.length - a.comments.length
        }
        return 0
      })
    },

    // 게시글 필터링
    filterPosts(keyword = '', tags = [], sortBy = 'latest') {
      try {
        let filteredPosts = [...this.posts]
        filteredPosts = this.filterByKeyword(filteredPosts, keyword)
        filteredPosts = this.filterByTags(filteredPosts, tags)
        return this.sortPosts(filteredPosts, sortBy)
      } catch (error) {
        console.error('게시글 필터링 실패:', error)
        return []
      }
    },

    // 게시글 좋아요
    async likePost(postId) {
      try {
        const response = await likeFreeboardPost(postId)

        return response
      } catch (error) {
        console.error('게시글 좋아요 실패:', error)
        throw error
      }
    },

    // 게시글 좋아요 취소
    async unlikePost(likeId) {
      try {
        const response = await unlikeFreeboardPost(likeId)
        return response
      } catch (error) {
        console.error('게시글 좋아요 취소 실패:', error)
        throw error
      }
    },

    async updatePost(postData) {
      try {
        const response = await updateFreeboardPost(postData)

        // 현재 게시글 업데이트
        if (this.currentPost && this.currentPost._id === postData.id) {
          this.currentPost = {
            ...this.currentPost,
            ...response,
          }
        }

        // posts 배열의 해당 게시글도 업데이트
        const postIndex = this.posts.findIndex((post) => post._id === postData.id)
        if (postIndex !== -1) {
          this.posts[postIndex] = {
            ...this.posts[postIndex],
            ...response,
          }
        }

        return response
      } catch (error) {
        console.error('게시글 업데이트 실패:', error)
        throw error
      }
    },
  },
})
