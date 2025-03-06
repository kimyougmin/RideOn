export function usePostStore(options = {}) {
  const {
    getPostsApi,
    updatePostApi,
    likePostApi,
    unlikePostApi,
    createCommentApi,
    deleteCommentApi,
    channelId,
    hasStatus = false,
  } = options

  return {
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
          const response = await getPostsApi(channelId)
          this.posts = response
        } catch (error) {
          this.error = '게시글 목록을 불러오는데 실패했습니다.'
          console.error('게시글 목록 조회 실패:', error)
        } finally {
          this.isLoading = false
        }
      },

      async fetchPostById(id, refresh = false) {
        this.isLoading = true
        this.error = null

        try {
          if (refresh) {
            await this.fetchPosts()
            const post = this.posts.find((post) => post._id === id)
            if (post) {
              this.currentPost = post
              return post
            }
          }

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

      filterByStatus(posts, status = 'all') {
        if (!hasStatus || status === 'all') return posts
        return posts.filter((post) => post.status === status)
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

      filterPosts(keyword = '', tags = [], sortBy = 'latest', status = 'all') {
        try {
          let filteredPosts = [...this.posts]
          filteredPosts = this.filterByKeyword(filteredPosts, keyword)
          filteredPosts = this.filterByTags(filteredPosts, tags)
          filteredPosts = this.filterByStatus(filteredPosts, status)
          return this.sortPosts(filteredPosts, sortBy)
        } catch (error) {
          console.error('게시글 필터링 실패:', error)
          return []
        }
      },

      async updatePost(postData) {
        try {
          const updatedPost = await updatePostApi(postData)

          // 현재 게시글 업데이트
          if (this.currentPost && this.currentPost._id === postData.id) {
            this.currentPost = {
              ...this.currentPost,
              ...updatedPost,
            }
          }

          // posts 배열의 해당 게시글도 업데이트
          const postIndex = this.posts.findIndex((post) => post._id === postData.id)
          if (postIndex !== -1) {
            this.posts[postIndex] = {
              ...this.posts[postIndex],
              ...updatedPost,
            }
          }

          return updatedPost
        } catch (error) {
          console.error('게시글 업데이트 실패:', error)
          throw error
        }
      },

      async likePost(postId) {
        try {
          await likePostApi(postId)
          const updatedPost = await this.fetchPostById(postId, true)
          return updatedPost
        } catch (error) {
          console.error('게시글 좋아요 실패:', error)
          throw error
        }
      },

      async unlikePost(likeId, postId) {
        try {
          await unlikePostApi(likeId)
          const updatedPost = await this.fetchPostById(postId, true)
          return updatedPost
        } catch (error) {
          console.error('게시글 좋아요 취소 실패:', error)
          throw error
        }
      },

      async createComment(postId, comment) {
        try {
          await createCommentApi(postId, comment)
          const updatedPost = await this.fetchPostById(postId, true)
          return updatedPost
        } catch (error) {
          console.error('게시글 댓글 생성 실패:', error)
          throw error
        }
      },

      async deleteComment(commentId, postId) {
        try {
          await deleteCommentApi(commentId)
          const updatedPost = await this.fetchPostById(postId, true)
          return updatedPost
        } catch (error) {
          console.error('게시글 댓글 삭제 실패:', error)
          throw error
        }
      },
    },
  }
}
