import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "src/modules/user/entities/user.entity"
import { ILike } from "../like.interface"
import { Post } from "src/modules/post/entities/post.entity"

@Entity()
export class Like extends BaseEntity implements ILike {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  postId: number

  @ManyToOne(() => User, (user) => user.likes)
  user: User

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post
}
