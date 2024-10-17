import { IsNotEmpty, IsString } from "class-validator"

export class CreatePostDto {
  @IsNotEmpty()
  userId: number

  @IsNotEmpty()
  lat: number

  @IsNotEmpty()
  lng: number

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  photo: string
}
