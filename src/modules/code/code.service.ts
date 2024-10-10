import { BadRequestException, Injectable } from "@nestjs/common"
import { ConfirmEmailDto } from "./dto/confirm-email.dto"
import { DefaultResponse } from "../../common/types/types"
import { ApiError } from "../../common/constants/errors"
import { VerifyCodeDto } from "./dto/verify-code.dto"
import { MailerService } from "@nestjs-modules/mailer"
import { InjectRepository } from "@nestjs/typeorm"
import { Code } from "./entities/code.entity"
import { LessThan, Repository } from "typeorm"
import { GetAuthCodeExpTime } from "../../common/helpers/getAuthCodeExpTime"
import { UserService } from "../user/user.service"
import { v4 as uuid } from "uuid"

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code)
    private readonly codeRepository: Repository<Code>,
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  async sendConfirmCode({ email }: ConfirmEmailDto): Promise<DefaultResponse> {
    const existUser = await this.userService.getByEmail(email)
    if (existUser) throw new BadRequestException(ApiError.USER_EXIST)

    // const code = uuid().slice(0, 6)
    const code = "111111"

    await this.mailerService.sendMail({
      to: email,
      from: "remi mail sender",
      subject: "confirm email",
      text: "please confirm your email",
      html: `<div>${code}</div>`,
    })

    const newCode = this.codeRepository.create({
      code,
      expTime: new Date(Date.now() + GetAuthCodeExpTime()),
    })

    await newCode.save()

    return { message: "code was sent" }
  }

  async verifyCode({ code }: VerifyCodeDto) {
    await this.deleteExpired()

    const codeData = await this.codeRepository.findOneBy({ code })
    if (!codeData) throw new BadRequestException(ApiError.INVALID_CODE)

    await codeData.remove()

    return { message: "code is correct" }
  }

  async deleteExpired() {
    const expCods = await this.codeRepository.find({
      where: {
        expTime: LessThan(new Date()),
      },
    })

    await this.codeRepository.remove(expCods)
  }
}
