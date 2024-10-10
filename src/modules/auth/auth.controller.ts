import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { CreateUserDto } from "../user/dto/create-user.dto"
import { AuthService } from "./auth.service"
import { LoginUserDto } from "./dto/login-user.dto"
import { TokenService } from "../token/token.service"
import { Request, Response } from "express"
import { GetCookieExpTime } from "../../common/helpers/getCookieExpTime"
import { FileInterceptor } from "@nestjs/platform-express"
import { getMulterConfig } from "src/common/helpers/getMulterConfig"

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post("register")
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor("avatar", getMulterConfig()))
  async register(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() userInfo: CreateUserDto,
    @Res() response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.registerUser({
      ...userInfo,
      avatar: avatar.filename,
    })
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: false,
      secure: true,
      maxAge: GetCookieExpTime(),
    })
    response.json({ accessToken })
  }

  @Get("refresh")
  async refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = request.cookies
    const { accessToken, refreshToken: newRefreshToken } =
      await this.tokenService.refreshTokens(refreshToken)
    response.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,

      maxAge: GetCookieExpTime(),
    })
    return { accessToken }
  }

  @UsePipes(ValidationPipe)
  @Post("login")
  async login(
    @Body() userLoginData: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.loginUser(userLoginData)
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: GetCookieExpTime(),
    })
    return { accessToken }
  }

  @Delete("logout")
  async logout(@Req() request: Request, @Res() response: Response) {
    const { refreshToken } = request.cookies

    await this.authService.logoutUser(refreshToken)

    response.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: GetCookieExpTime(),
    })
    response.json({ message: "you are logged out" })
  }
}
