import React from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  TouchableOpacity,
  Touchable,
  TouchableHighlight,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface Props {
  isError?: boolean
  label: string
  onChangeText: (text: string) => void
  onBlur?: () => void
  onSubmitEditing?: () => void
  keyboardType?: KeyboardTypeOptions
  value?: string
  inputStyles?: StyleProp<TextStyle>
  contStyles?: StyleProp<ViewStyle>
  labelStyles?: StyleProp<TextStyle>
  labelContStyles?: StyleProp<ViewStyle>
}

//FOLLOWS THE LOGIC OF NATIVE TEXT INPUT
export const InputWithLabel = ({
  isError = false,
  label,
  onBlur: handleBlur,
  onChangeText: handleChangeText,
  value,
  keyboardType,
  contStyles,
  labelContStyles,
  inputStyles,
  labelStyles,
  onSubmitEditing,
}: Props) => {
  const [fieldHeight, setFieldHeight] = useState(40)
  const [labelHeight, setLabelHeight] = useState(20)

  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState(value || '')
  const inputRef = useRef<TextInput | null>(null)

  useEffect(() => {
    if (value || value === '') setInputValue(value)
  }, [value])

  const onTextChange = (text: string) => {
    if (value || value === '') handleChangeText(text)
    else {
      handleChangeText(text)
      setInputValue(text)
    }
  }
  const onBlur = () => {
    if (handleBlur) handleBlur()
    setIsFocused(false)
  }
  const onFocus = () => {
    setIsFocused(true)
  }

  const isAnimated = isFocused || inputValue.length > 0

  const slideAnim = useSharedValue(0)

  const slideStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      slideAnim.value,
      [0, 1],
      [fieldHeight / 2 - labelHeight / 2, -labelHeight / 2],
    )

    const translateX = interpolate(slideAnim.value, [0, 1], [17, 22])

    return {
      transform: [{ translateY }, { translateX }],
    }
  })

  useEffect(() => {
    if (isAnimated) {
      slideAnim.value = withTiming(1, { duration: 100 })
    } else {
      slideAnim.value = withTiming(0, { duration: 100 })
    }
  }, [isAnimated])

  const onLayout = (e: LayoutChangeEvent) => {
    if (e.nativeEvent.layout.height) setFieldHeight(e.nativeEvent.layout.height)
  }
  const onLabelLayout = (e: LayoutChangeEvent) => {
    if (e.nativeEvent.layout.height) setLabelHeight(e.nativeEvent.layout.height)
  }

  const styles = getStyles(isError)
  return (
    <View onLayout={onLayout} style={styles.fieldContainer}>
      <View style={styles.labelContainer} onLayout={onLayout}>
        <Animated.Text
          onLayout={onLabelLayout}
          style={[styles.label, labelStyles, slideStyles]}
        >
          {label}
        </Animated.Text>
      </View>
      <TextInput
        keyboardType={keyboardType}
        onChangeText={onTextChange}
        value={inputValue}
        ref={inputRef}
        onFocus={onFocus}
        onSubmitEditing={onSubmitEditing}
        onBlur={onBlur}
        style={[styles.field, inputStyles]}
      />
    </View>
  )
}

const getStyles = (isError: boolean) =>
  StyleSheet.create({
    fieldContainer: {
      position: 'relative',
      // marginBottom: 15,
      justifyContent: 'center',
      height: 40,
    },
    labelContainer: {
      pointerEvents: 'none',
      backgroundColor: 'transparent',
      zIndex: 1,
    },
    label: {
      position: 'absolute',
      top: 0,
      left: 0,
      borderRadius: 20,
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 5,
      backgroundColor: 'white',
      zIndex: 1,
      paddingLeft: 7,
      paddingRight: 7,
      color: isError ? 'red' : '#000',
    },

    field: {
      fontSize: 15,
      backgroundColor: 'white',
      borderColor: isError ? 'red' : '#000',
      borderWidth: 1,
      height: '100%',
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 10,
      width: '100%',
    },
  })
