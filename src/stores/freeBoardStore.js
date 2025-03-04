import { defineStore } from 'pinia'

import { getFreeboardPosts } from '@/apis/freeboardApi'
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
            id: post._id,
            image: post.image || null,
            title: parsedTitle.title?.trim() || '',
            content: parsedTitle.content?.trim() || '',
            views: 0,
            likes: post.likes || [],
            comments: post.comments || [],
            tags: Array.isArray(parsedTitle.tags) ? parsedTitle.tags : [],
            author: {
              fullName: post.author?.fullName?.split('|')[0] || '알 수 없음',
              coverImage: post.author?.coverImage || 'https://placehold.co/20x20?text=RideOn',
            },
            createdAt: post.createdAt,
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
        const existingPost = this.posts.find((post) => post.id === id)
        if (existingPost) {
          this.currentPost = existingPost
          return existingPost
        }

        if (this.posts.length === 0) {
          await this.fetchPosts()
          const post = this.posts.find((post) => post.id === id)
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

    filterPosts(keyword = '', tags = [], sortBy = 'latest') {
      try {
        let filteredPosts = [...this.posts]

        if (keyword || tags.length > 0) {
          filteredPosts = this.posts.filter((post) => {
            const searchFields = [
              post.title.toLowerCase(),
              post.content.toLowerCase(),
              ...post.tags.map((tag) => tag.toLowerCase()),
            ]
            const keywordMatch =
              !keyword || searchFields.some((field) => field.includes(keyword.toLowerCase()))
            const tagsMatch =
              tags.length === 0 ||
              tags.every((tag) => post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()))

            return keywordMatch && tagsMatch
          })
        }

        return filteredPosts.sort((a, b) => {
          if (sortBy === 'latest') {
            return new Date(b.createdAt) - new Date(a.createdAt)
          }
          if (sortBy === 'mostLiked') {
            return b.likes - a.likes
          }
          return 0
        })
      } catch (error) {
        console.error('게시글 필터링 실패:', error)
        return []
      }
    },
  },
})
