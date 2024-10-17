import { useState } from 'react'
import { Gesture } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'

const trimZoom = (zoom: number) => {
  if (zoom < 0) return 0
  if (zoom > 1) return 1
  return zoom
}

export const useCameraZoom = () => {
  const [zoom, setZoom] = useState(0)
  const [savedZoom, setSavedZoom] = useState(0)

  const setNewZoom = (newZoom: number) => setZoom(trimZoom(newZoom - 1))
  const saveZoom = (zoom: number) => {
    setSavedZoom(trimZoom(zoom - 1))
  }

  const pinch = Gesture.Pinch()
    .onChange((event) => {
      runOnJS(setNewZoom)(savedZoom + event.scale)
    })
    .onEnd((event) => runOnJS(saveZoom)(event.scale))

  return {
    zoom,
    pinch,
  }
}
