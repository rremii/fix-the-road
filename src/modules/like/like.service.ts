import { PostService } from "./../post/post.service"
import { UserService } from "./../user/user.service"
import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Like } from "./entities/like.entity"
import { Repository } from "typeorm"
import { ApiError } from "src/common/constants/errors"

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  async getLikesCount(postId: number) {
    return await this.likeRepository.count({ where: { postId } })
  }
  async getIsLiked(userId: number, postId: number): Promise<boolean> {
    const like = await this.likeRepository.findOneBy({ userId, postId })

    if (!like) return false
    return true
  }

  async getLikesInfo(userId: number, postId: number) {
    const isLiked = await this.getIsLiked(userId, postId)

    const likesCount = await this.getLikesCount(postId)

    return {
      isLiked,
      likesCount,
    }
  }

  async addLike(userId: number, postId: number) {
    const user = await this.userService.getById(userId)
    if (!user) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    const post = await this.postService.getById(postId)
    if (!post) throw new BadRequestException(ApiError.POST_NOT_FOUND)

    const like = new Like()

    like.post = post
    like.user = user

    return await like.save()
  }

  async removeLike(likeId: number) {
    return await this.likeRepository.delete({ id: likeId })
  }
}
