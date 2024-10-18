type Schema = {
  required?: boolean
  max?: number
  min?: number
}

export const passwordSchema: Schema = {
  required: true,
  min: 5,
}
export const textAreaSchema: Schema = {
  required: true,
  min: 3,
  max: 50,
}

export const userNameSchema: Schema = {
  required: true,
  min: 5,
  max: 20,
}
