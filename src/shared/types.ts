import { AxiosError } from 'axios'

export type Location = {
  lat: number
  lng: number
}

export type FormDataAsset = {
  uri: string
  name: string
  type: string
}

export type UploadFileResponse = {
  fileName: string
  mimeType: string
}

export type ApiError = {
  message: string
  name: string
  status: number
  config: AxiosError['config']
}
