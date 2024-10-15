import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common"
import { AccessTokenGuard } from "src/guards/access-token.guard"
import { LikeService } from "./like.service"

@Controller("like")
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get("info/user/:userId/post/:postId")
  @UseGuards(AccessTokenGuard)
  getLikesInfo(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("postId", ParseIntPipe) postId: number,
  ) {
    return this.likeService.getLikesInfo(userId, postId)
  }

  @Post("user/:userId/post/:postId")
  @UseGuards(AccessTokenGuard)
  addLike(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("postId", ParseIntPipe) postId: number,
  ) {
    return this.likeService.addLike(userId, postId)
  }

  @Delete("user/:userId/post/:postId")
  @UseGuards(AccessTokenGuard)
  removeLike(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("postId", ParseIntPipe) postId: number,
  ) {
    return this.likeService.removeLike(userId, postId)
  }
}
