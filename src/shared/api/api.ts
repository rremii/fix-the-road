import {
  authRefreshInterceptor,
  extractErrorInterceptor,
  withTokenInterceptor,
} from '@shared/api/interceptors'
import axios from 'axios'
import { API_URL } from './constants'
import { Platform } from 'react-native'

export const api = axios.create({
  withCredentials: Platform.OS !== 'web',
  baseURL: API_URL,
})

export const apiDefault = axios.create({
  withCredentials: Platform.OS !== 'web',
  baseURL: API_URL,
})

api.interceptors.request.use(withTokenInterceptor)
api.interceptors.response.use((config) => {
  return config
}, authRefreshInterceptor)
api.interceptors.response.use((config) => {
  return config
}, extractErrorInterceptor)
