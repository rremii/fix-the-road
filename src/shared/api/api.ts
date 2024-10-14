import {
  authRefreshInterceptor,
  extractErrorInterceptor,
  withTokenInterceptor,
} from '@shared/api/interceptors'
import axios from 'axios'
import { API_URL } from './constants'
import { Platform } from 'react-native'
import { API_NGROK } from './temp'

export const api = axios.create({
  withCredentials: Platform.OS !== 'web',
  baseURL: Platform.OS === 'web' ? API_URL : API_NGROK,
})

api.interceptors.request.use(withTokenInterceptor)
api.interceptors.response.use((config) => {
  return config
}, authRefreshInterceptor(api))
api.interceptors.response.use((config) => {
  return config
}, extractErrorInterceptor)
