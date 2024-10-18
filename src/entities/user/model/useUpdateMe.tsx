import { useMutation } from '@tanstack/react-query'
import { IUser, UpdateMeDto } from '../types'
import { ApiError } from '@shared/types'
import { userApi } from '../api/api'
import { useToast } from '@shared/modules/toast'
import { queryApi } from '@shared/api/queryApi'
import { updateMe, UpdateMeSaga, updateMeSaga } from '../api/updateMe.saga'
import { Avatar } from '@shared/ui/Avatar'
import { Platform } from 'react-native'
import { URIToFile } from '@shared/utils/URIToFile'

export const useUpdateMe = () => {
  const { openToast } = useToast()

  const {
    data,
    error,
    isPending,
    mutate: mutateUpdateMe,
    isError,
    isSuccess,
  } = useMutation<IUser, ApiError, UpdateMeDto>({
    mutationFn: updateMe,
    mutationKey: ['me'],
    onError: (error) => {
      if (!error) return

      openToast({
        type: 'error',
        content: error.message,
      })
    },
    onSuccess: (data) => {
      if (!data) return
      openToast({
        type: 'warn',
        content: 'Successfully saved',
      })

      queryApi.invalidateQueries({ queryKey: ['me'] })
    },
  })

  const update = (updateMeDto: UpdateMeDto) => {
    mutateUpdateMe(updateMeDto)
  }

  return { updateMe: update, isPending, isSuccess, error, isError }
}
