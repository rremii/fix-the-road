import { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { ACCESS_TOKEN } from './constants'
import { api, apiDefault } from './api'
import { storage } from '@modules/secureStorage'
import { ApiError } from '@shared/types'

export const authRefreshInterceptor = async (error: AxiosError<ApiError>) => {
  if (error.response?.status === 401) {
    const originalRequest = error.config
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await apiDefault.post<{ accessToken: string }>(
          'auth/refresh',
        )

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

export const withTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  if (config.headers !== null) {
    storage.getItem(ACCESS_TOKEN).then((token) => {
      if (token) config.headers.Authorization = `${token}`
    })
  }
  return config
}
