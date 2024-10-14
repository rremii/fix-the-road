import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { IPost } from "../post.interface"
import { User } from "src/modules/user/entities/user.entity"
import { Like } from "src/modules/like/entities/like.entity"

@Entity()
export class Post extends BaseEntity implements IPost {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  lat: number

  @Column()
  lng: number

  @Column()
  description: string

  @Column()
  photo: string

  @Column()
  userId: number

  @ManyToOne(() => User, (user) => user.id)
  user: User

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[]
}
