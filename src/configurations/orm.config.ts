import { ConfigService } from "@nestjs/config"
import { User } from "../modules/user/entities/user.entity"
import { Code } from "../modules/code/entities/code.entity"
import { Post } from "src/modules/post/entities/post.entity"
import { Like } from "src/modules/like/entities/like.entity"

export const getOrmConfig = async (config: ConfigService): Promise<any> => {
  return {
    type: "postgres",

    host: config.get("db_host"),
    port: config.get("db_port"),
    username: config.get("db_user_name"),
    password: config.get("db_password"),
    database: config.get("db_name"),
    synchronize: true,

    entities: [User, Code, Post, Like],

    // ssl: true,
    // extra: {
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // },
  }
}
