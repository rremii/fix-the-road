import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { PostService } from "./post.service"
import { CreatePostDto } from "./dto/create-post.dto"
import { UpdatePostDto } from "./dto/update-post.dto"
import { AccessTokenGuard } from "src/guards/access-token.guard"

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  async getAll() {
    return this.postService.getAll()
  }

  @Get(":id")
  @UseGuards(AccessTokenGuard)
  @UsePipes(ValidationPipe)
  async getById(@Param("id", ParseIntPipe) id: number) {
    return this.postService.getById(id)
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto)
  }

  @Put("")
  @UseGuards(AccessTokenGuard)
  @UsePipes(ValidationPipe)
  async update(@Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(updatePostDto)
  }

  @Delete(":id")
  @UseGuards(AccessTokenGuard)
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.postService.remove(id)
  }
}
