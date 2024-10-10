import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../user/entities/user.entity"
import { TokenModule } from "../token/token.module"
import { AccessTokenStrategy } from "../../strategy/access-token.strategy"
import { RefreshTokenStrategy } from "../../strategy/refresh-token.strategy"
import { ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { UserModule } from "../user/user.module"

@Module({
  imports: [
    UserModule,
    JwtModule,
    TokenModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ConfigService,
  ],
})
export class AuthModule {}
