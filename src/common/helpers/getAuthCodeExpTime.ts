import * as config from "./../../configurations/index"

export const GetAuthCodeExpTime = () => {
  const { auth_code_expire } = config.default()
  return +auth_code_expire * 1000
}
