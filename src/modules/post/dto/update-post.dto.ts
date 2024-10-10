import { IsNotEmpty, IsNumber } from "class-validator"

export class UpdatePostDto {
  @IsNotEmpty()
  @IsNumber()
  id: number

  description?: string
}
