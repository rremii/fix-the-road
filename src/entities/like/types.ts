export interface LikesInfo {
  likesCount: number
  isLiked: boolean
}

export interface ILike {
  id: number
  userId: number
  postId: number
}

export interface AddLikeDto {
  userId: number
  postId: number
}
