import { useAuthStore } from './useAuthStore'

export const useLogin = () => {
  const setLoginState = useAuthStore((state) => state.setLoginState)

  const login = () => {
    setLoginState('success')
  }

  return {
    login,
    isPending: false,
    isError: false,
  }
}
