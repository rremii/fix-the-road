import { ConfigService } from "@nestjs/config"
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter"

export const getMailConfig = async (
  configService: ConfigService,
): Promise<any> => {
  return {
    transport: {
      host: "smtp.gmail.com",
      auth: {
        user: configService.get<string>("smtp_email"),
        pass: configService.get<string>("smtp_password"),
      },
    },
    defaults: {
      from: '"nest-modules" <modules@nestjs.com>',
    },
    template: {
      dir: __dirname + "/templates",
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  }
}
