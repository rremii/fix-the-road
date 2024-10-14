import { Platform } from 'react-native'
import { API_NGROK } from './temp'

export const ACCESS_TOKEN = 'access_token'

export const API_URL = 'http://localhost:5000/'

export const SERVER_ORIGIN = Platform.OS === 'web' ? API_URL : API_NGROK
