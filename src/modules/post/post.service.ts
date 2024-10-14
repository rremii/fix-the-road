import { BadRequestException, Injectable } from "@nestjs/common"
import { Post } from "./entities/post.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreatePostDto } from "./dto/create-post.dto"
import { UpdatePostDto } from "./dto/update-post.dto"
import { ApiError } from "src/common/constants/errors"
import { UserService } from "../user/user.service"
import { LikeService } from "../like/like.service"

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly userService: UserService,
  ) {}

  async getById(id: number): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
    })
  }

  async getAll() {
    return this.postRepository.find()
  }

  async create(
    { description, lat, lng, userId }: CreatePostDto,
    photo: string,
  ) {
    if (!photo) throw new BadRequestException(ApiError.PHOTO_REQUIRED)

    const user = await this.userService.getById(userId)
    if (!user) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    const post = new Post()

    post.description = description
    post.lat = lat
    post.lng = lng
    post.photo = photo
    post.user = user

    return await post.save()
  }

  async update({ description, id }: UpdatePostDto) {
    const post = await this.postRepository.findOneBy({ id })
    if (!post) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    if (description) post.description = description

    return post.save()
  }
}
