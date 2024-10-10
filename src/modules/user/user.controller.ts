import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common"
import { UserService } from "./user.service"
import { AccessTokenGuard } from "src/guards/access-token.guard"

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/me")
  @UseGuards(AccessTokenGuard)
  getUser(@Req() request: Request) {
    if (!("authorization" in request.headers)) throw new UnauthorizedException()
    const authHeader = request.headers.authorization as string

    const authToken = authHeader.split(" ")[1]

    return this.userService.getByToken(authToken)
  }
}
