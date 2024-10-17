import React, { ReactNode } from 'react'
import { UIBtnProps } from './types'
import { SimpleBtn } from './buttons/simpleBtn/SimpleBtn'
import { DangerBtn } from './buttons/dangerBtn/DangerBtn'
import { FilledBtn } from './buttons/filledBtn/FilledBtn'

export const Button = ({ type, ...btnParams }: UIBtnProps): ReactNode => {
  switch (type) {
    case 'simple':
      return <SimpleBtn {...btnParams} />
    case 'danger':
      return <DangerBtn {...btnParams} />
    case 'filled':
      return <FilledBtn {...btnParams} />
  }
}
