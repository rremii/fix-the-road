import { useEffect, useMemo } from 'react'
import { IUser } from '../types'
import { useQuery } from '@tanstack/react-query'
import { userApi } from '../api/api'
import { ApiError } from '@shared/types'
import { useToast } from '@shared/modules/toast'
import { BASE_URL } from '@shared/api/constants'

export const useGetMe = () => {
  const { openToast } = useToast()

  const {
    data: me,
    isSuccess,
    error,
    isPending,
  } = useQuery<IUser, ApiError>({
    queryKey: ['me'],
    queryFn: userApi.getMe,
  })

  useEffect(() => {
    if (!error) return

    openToast({
      content: "Couldn't fetch me",
      type: 'error',
    })
  }, [error])

  const user: IUser | undefined = me
    ? { ...me, avatar: me.avatar ? BASE_URL + '/' + me.avatar : undefined }
    : undefined

  return useMemo(
    () => ({
      me: user,
      isSuccess,
      error,
      isPending,
    }),
    [error, isPending, isSuccess, me],
  )
}
