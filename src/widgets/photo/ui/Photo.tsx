import { CameraView } from 'expo-camera'
import React, { useRef, useState } from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useHandleCameraPermission } from '../model/useHandleCameraPermission'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { NewPostNavigationParam } from 'src/app/navigation/mobile/types'
import { GestureDetector } from 'react-native-gesture-handler'
import { useCameraZoom } from '../model/useCameraZoom'
import { useUnlockScreenOrientation } from '@shared/hooks/useUnlockScreenOrientation'
import { useCreatePostStore } from 'src/entities/post/model/createPostStore'

const cameraFacing = 'back'
export default function Photo() {
  const navigation =
    useNavigation<StackNavigationProp<NewPostNavigationParam, 'photo'>>()
  useHandleCameraPermission()
  useUnlockScreenOrientation()
  const setCreatePostPhotoUri = useCreatePostStore(
    (state) => state.setCreatePostPhotoUri,
  )

  const { pinch, zoom } = useCameraZoom()
  const [photoUri, setPhotoUri] = useState('')
  const [isTakingPhoto, setTaking] = useState(false)
  const camera = useRef<CameraView>(null)

  const takePhoto = () => {
    if (!camera.current) return
    setTaking(true)
    camera.current
      .takePictureAsync()
      .then((photo) => {
        if (photo) setPhotoUri(photo.uri)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setTaking(false)
      })
  }

  const submit = () => {
    if (!photoUri) return
    setCreatePostPhotoUri(photoUri)
    navigation.navigate('preview')
  }

  const clearPhoto = () => {
    setPhotoUri('')
  }

  return (
    <View style={styles.container}>
      {isTakingPhoto && (
        <View style={styles.loaderCont}>
          <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 80} />
        </View>
      )}
      {photoUri ? (
        <ImageBackground source={{ uri: photoUri }} style={styles.camera}>
          <View style={styles.btnCont}>
            <Pressable style={styles.button} onPress={clearPhoto}>
              <Text style={styles.btnText}>Retake</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.submit]} onPress={submit}>
              <Text style={styles.btnText}>Save</Text>
            </Pressable>
          </View>
        </ImageBackground>
      ) : (
        <GestureDetector gesture={pinch}>
          <CameraView
            zoom={zoom}
            ref={camera}
            style={styles.camera}
            facing={cameraFacing}
          >
            <Pressable style={styles.button} onPress={takePhoto}>
              <Text style={styles.btnText}>Take Photo</Text>
            </Pressable>
          </CameraView>
        </GestureDetector>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnCont: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#aedcff',
    marginBottom: 20,
  },
  submit: {
    backgroundColor: '#b2f2bb',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  loaderCont: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
