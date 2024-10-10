import * as bcrypt from "bcrypt"

export const HashData = async (data: any) => {
  return bcrypt.hash(data, 5)
}
