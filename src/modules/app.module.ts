import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import configurations from "../configurations"
import { getOrmConfig } from "../configurations/orm.config"
import { MailerModule } from "@nestjs-modules/mailer"
import { getMailConfig } from "../configurations/mail.config"
import { CodeModule } from "./code/code.module"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./user/user.module"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"
import { PostModule } from "./post/post.module"

@Module({
  imports: [
    PostModule,
    CodeModule,
    AuthModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../../static"),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
      envFilePath: [".development.env", ".env", ".production.env"],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getOrmConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
