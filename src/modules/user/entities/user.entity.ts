import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { IUser } from "../user.interface"

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
}
