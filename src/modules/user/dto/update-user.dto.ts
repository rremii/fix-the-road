import { IsNotEmpty } from "class-validator"

export class UpdateUserDto {
  @IsNotEmpty()
  id: number

  userName?: string

  avatar?: string
}
