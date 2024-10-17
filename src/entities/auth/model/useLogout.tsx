// import { setAuthRejected } from "@entities/auth"
// import { useLogoutMutation } from "@entities/auth/api/AuthApi.ts"
// import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
// import { useEffect } from "react"

// export const useLogout = () => {
//   const dispatch = useAppDispatch()

//   const [logout, { isLoading, isError, error, isSuccess }] = useLogoutMutation()

//   useEffect(() => {
//     if (!isSuccess && !isError) return

//     localStorage.removeItem("accessToken")
//     dispatch(setAuthRejected())
//   }, [isLoading])

//   const handleLogout = async () => {
//     await logout()
//   }

//   return {
//     logout: handleLogout,
//     isLoading,
//     isError,
//     error,
//     isSuccess,
//   }
// }
