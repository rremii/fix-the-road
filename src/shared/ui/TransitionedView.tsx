import { PropsWithChildren } from 'react'
import Animated, {
  EntryExitTransition,
  FadeInLeft,
  FadeInRight,
  FadeOutRight,
  LinearTransition,
  SequencedTransition,
} from 'react-native-reanimated'
import React from 'react'

FadeInLeft.duration(300)
FadeOutRight.duration(300)

interface Props extends PropsWithChildren {
  animation?: typeof LinearTransition
  enteringAnim?: typeof FadeInLeft | typeof FadeInRight
  exitingAnim?: typeof FadeOutRight | typeof FadeInLeft
}

export const TransitionedView = ({
  children,
  animation = LinearTransition,
  enteringAnim,
  exitingAnim,
}: Props) => {
  return (
    <Animated.View
      entering={enteringAnim}
      exiting={exitingAnim}
      layout={animation}
    >
      {children}
    </Animated.View>
  )
}
