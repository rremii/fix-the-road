import { Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./entities/user.entity"
import { TokenModule } from "../token/token.module"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure() {}
}
