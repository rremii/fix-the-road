import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { Request } from "express"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("refresh_secret_jwt"),
      passReqToCallback: true,
      ignoreExpiration: false,
    })
  }

  validate(request: Request, payload: any) {
    const refreshToken = request
      .get("Authorization")
      .replace("Bearer", "")
      .trim()
    return { ...payload, refreshToken }
  }
}
