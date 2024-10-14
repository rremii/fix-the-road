import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { PostService } from "./post.service"
import { CreatePostDto } from "./dto/create-post.dto"
import { UpdatePostDto } from "./dto/update-post.dto"
import { FileInterceptor } from "@nestjs/platform-express"
import { getMulterConfig } from "src/common/helpers/getMulterConfig"
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
  @UseInterceptors(FileInterceptor("photo", getMulterConfig()))
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @UploadedFile() photo: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.create(
      {
        description: createPostDto.description,
        lat: +createPostDto.lat,
        lng: +createPostDto.lng,
        userId: +createPostDto.userId,
      },
      photo.filename,
    )
  }

  @Put("")
  @UseGuards(AccessTokenGuard)
  @UsePipes(ValidationPipe)
  async update(@Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(updatePostDto)
  }
}
