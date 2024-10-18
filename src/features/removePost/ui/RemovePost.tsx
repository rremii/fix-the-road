import { Button } from '@shared/ui/button'
import React from 'react'
import { useEffect } from 'react'
import { useRemovePost } from 'src/entities/post/model/useRemovePost'
import { useUIStore } from 'src/entities/ui/model/UIStore'

interface Props {
  postId?: number
}

export const RemovePost = ({ postId }: Props) => {
  const { removePost, isPending, isSuccess } = useRemovePost()
  const closeMenu = useUIStore((state) => state.closeMenu)

  useEffect(() => {
    if (!isSuccess) return
    closeMenu('postModal')
  }, [isSuccess])

  const remove = () => {
    if (!postId) return
    removePost(postId)
  }
  return (
    <Button withSpinner pending={isPending} onPress={remove} type="danger">
      Remove
    </Button>
  )
}
