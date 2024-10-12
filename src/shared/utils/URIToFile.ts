export function URIToFile(dataURI: string, filename: string) {
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
}
