import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: "invalid email" })
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
