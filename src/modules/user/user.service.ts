import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./entities/user.entity"
import { TokenService } from "../token/token.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { HashData } from "src/common/helpers/hashData"
import {  IUserInfo } from "./user.interface"
import { ApiError } from "src/common/constants/errors"
import { UpdateUserDto } from "./dto/update-user.dto"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async create({
    email,
    password,
    userName,
    avatar,
  }: CreateUserDto): Promise<User> {
    const user = new User()

    user.email = email
    user.userName = userName
    user.password = await HashData(password)
    if (avatar) user.avatar = avatar

    return await user.save()
  }

  async update({ id, avatar, userName }: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    if (userName) user.userName = userName
    if (avatar) user.avatar = avatar
    // user.avatar = this.configService.get("server_origin") + "/" + avatar

    return user.save()
  }

  async getByToken(authToken: string): Promise<IUserInfo> {
    const decodedUser = await this.tokenService.decodeToken(authToken)
    if (!decodedUser) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    const user = this.userRepository.findOne({
      where: { id: decodedUser.id },
      select: ["id", "email", "avatar", "userName"],
    })

    if (!user) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    return user
  }
  async getByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email })
  }
  async getById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id })
  }
}
