import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { IUser } from "../user.interface"
import { Post } from "src/modules/post/entities/post.entity"
import { Like } from "src/modules/like/entities/like.entity"

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userName: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  avatar?: string

  @Column({ nullable: true })
  refreshToken: string

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[]
}
