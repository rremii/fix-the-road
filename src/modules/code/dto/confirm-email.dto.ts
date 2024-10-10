import { IsEmail, IsNotEmpty } from "class-validator"

export class ConfirmEmailDto {
  @IsNotEmpty()
  @IsEmail({}, { message: "invalid email" })
  email: string
}
