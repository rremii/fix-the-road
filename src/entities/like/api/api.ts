import { Like } from './../../../features/like/ui/Like'
import { api } from '@shared/api/api'
import { AddLikeDto, ILike, LikesInfo } from '../types'

class LikeApi {
  async getLikesInfo(userId: number, postId: number) {
    const result = await api.get<LikesInfo>(
      'like/info/user/' + userId + '/post/' + postId,
    )

    return result.data
  }

  async addLike({ postId, userId }: AddLikeDto) {
    const result = await api.post<ILike>(
      'like/user/' + userId + '/post/' + postId,
    )
    return result.data
  }

  async removeLike(likeId: number) {
    await api.delete<void>('like/' + likeId)
  }
}
export const likeApi = new LikeApi()
