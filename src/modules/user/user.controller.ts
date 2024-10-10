import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common"
import { UserService } from "./user.service"
import { AccessTokenGuard } from "src/guards/access-token.guard"
import { UpdateUserDto } from "./dto/update-user.dto"
import { FileInterceptor } from "@nestjs/platform-express"
import { getMulterConfig } from "src/common/helpers/getMulterConfig"

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/me")
  @UseGuards(AccessTokenGuard)
  getMe(@Req() request: Request) {
    if (!("authorization" in request.headers)) throw new UnauthorizedException()
    const authHeader = request.headers.authorization as string

    const authToken = authHeader.split(" ")[1]

    return this.userService.getByToken(authToken)
  }

  @Put("/me")
  @UseInterceptors(FileInterceptor("avatar", getMulterConfig()))
  @UseGuards(AccessTokenGuard)
  updateMe(
    @Body() updateDto: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.userService.update({ ...updateDto, avatar: avatar.filename })
  }
}
