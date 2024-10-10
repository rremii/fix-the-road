import * as config from "./../../configurations/index"

export const GetCookieExpTime = () => {
  const { refresh_expire_jwt } = config.default()
  return +refresh_expire_jwt * 1000
}
