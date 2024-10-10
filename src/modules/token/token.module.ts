import { Module } from "@nestjs/common"
import { TokenService } from "./token.service"
import { JwtModule, JwtService } from "@nestjs/jwt"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../user/entities/user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  providers: [TokenService, JwtService],
  exports: [TokenService],
})
export class TokenModule {}
