import { FormDataAsset } from '@shared/types'
import { Platform } from 'react-native'

export async function URIToFile(
  dataURI: string,
  filename: string,
): Promise<File | FormDataAsset> {
  if (Platform.OS === 'web') {
    // Преобразуем данные, закодированные в формате base64
    let byteString = atob(dataURI.split(',')[1])
    // Определить MIME-тип из Data URI
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    // Формируем массив бинарных данных
    let ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    // Создаем файл из блоба
    let file = new File([ia], filename, { type: mimeString })

    return file
  } else {
    const response = await fetch(dataURI)
    const blob = await response.blob()
    const type = blob.type || 'image/png'

    const name = filename.split('.').at(-1) ? filename : filename + blob.type

    return {
      uri: dataURI,
      name,
      type,
    }
  }
}
