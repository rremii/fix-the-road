import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'
import { ACCESS_TOKEN } from './constants'
import { storage } from '@modules/storage'
import { ApiError } from '@shared/types'
import { AuthResponse } from 'src/entities/auth/types'

export const authRefreshInterceptor =
  (api: AxiosInstance) => async (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      const originalRequest = error.config
      if (
        error.response?.status === 401 &&
        error.config &&
        !error.config._isRetry
      ) {
        originalRequest._isRetry = true
        try {
          const response = await axios.get<AuthResponse>('auth/refresh', {
            withCredentials: true,
          })

          storage.setItem(ACCESS_TOKEN, response.data.accessToken).then(() => {
            return api.request(originalRequest)
          })
        } catch (e) {
          storage.removeItem(ACCESS_TOKEN)
        }
      }
      throw error
    }
    throw error
  }

export const extractErrorInterceptor = async (
  error: AxiosError<ApiError>,
): Promise<ApiError> => {
  if (error.response)
    throw {
      message: error.response?.data.message || 'Something went wrong',
      name: error.response?.data.name,
      status: error.response?.status || 500,
      config: error.config,
    }
  else
    throw {
      message: error.message || 'Something went wrong',
      name: error.name,
      status: error.status || 500,
      config: error.config,
    }
}

export const withTokenInterceptor = async (
  config: InternalAxiosRequestConfig,
) => {
  if (!config.headers) return config

  const token = await storage.getItem(ACCESS_TOKEN)
  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
}
