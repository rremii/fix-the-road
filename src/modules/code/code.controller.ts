import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { CodeService } from "./code.service"
import { ConfirmEmailDto } from "./dto/confirm-email.dto"
import { DefaultResponse } from "../../common/types/types"
import { VerifyCodeDto } from "./dto/verify-code.dto"

@Controller("confirm-code")
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @UsePipes(new ValidationPipe())
  @Post("send-code")
  async confirmEmail(@Body() email: ConfirmEmailDto): Promise<DefaultResponse> {
    return this.codeService.sendConfirmCode(email)
  }

  @UsePipes(new ValidationPipe())
  @Post("verify-code")
  async verifyCode(@Body() code: VerifyCodeDto): Promise<DefaultResponse> {
    return this.codeService.verifyCode(code)
  }
}
