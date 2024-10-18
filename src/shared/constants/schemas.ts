type Schema = {
  required?: boolean
  maxLength?: number
  minLength?: number
}

export const passwordSchema: Schema = {
  required: true,
  minLength: 5,
}
export const textAreaSchema: Schema = {
  required: true,
  minLength: 3,
  maxLength: 50,
}

export const userNameSchema: Schema = {
  required: true,
  minLength: 3,
  maxLength: 20,
}
