import { useAuthStore } from './useAuthStore'

export const useRegister = () => {
  const setLoginState = useAuthStore((state) => state.setLoginState)

  const register = () => {
    setLoginState('success')
  }

  return { register }
}
