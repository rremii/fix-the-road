import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm"
import { ICode } from "../code.interface"

@Entity()
@Unique(["code"])
export class Code extends BaseEntity implements ICode {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  code: string

  @Column()
  expTime: Date
}
