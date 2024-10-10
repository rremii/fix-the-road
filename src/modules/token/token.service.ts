import { ForbiddenException, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../user/entities/user.entity"
import { Repository } from "typeorm"
import { HashData } from "../../common/helpers/hashData"
import { TokenPayload } from "./types"
import { IUser } from "../user/user.interface"

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await HashData(refreshToken)
    await this.usersRepository.update(
      { id: userId },
      {
        refreshToken: hashedRefreshToken,
      },
    )
  }

  async decodeToken(authToken: string): Promise<TokenPayload> {
    return this.jwtService.decode(authToken) as TokenPayload
  }

  async refreshTokens(refreshToken: string) {
    const decodedUser = this.jwtService.decode(refreshToken) as TokenPayload
    if (!decodedUser) throw new ForbiddenException("Access Denied")

    const user = await this.usersRepository.findOneBy({ id: decodedUser.id })
    if (!user || !user.refreshToken)
      throw new ForbiddenException("Access Denied")

    const refreshTokenMatches = this.jwtService.verify(refreshToken, {
      secret: this.configService.get("refresh_secret_jwt"),
    })
    if (!refreshTokenMatches) throw new ForbiddenException("Access Denied")

    const tokens = await this.getTokens(user)
    await this.updateRefreshToken(user.id, tokens.refreshToken)

    return tokens
  }

  async getTokens({ id, email, ...user }: IUser) {
    const payload = { id, email }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("access_secret_jwt"),
        expiresIn: +this.configService.get("access_expire_jwt"),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("refresh_secret_jwt"),
        expiresIn: +this.configService.get("refresh_expire_jwt"),
      }),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }
}
