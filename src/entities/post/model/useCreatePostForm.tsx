export const useCreatePost = () => {
  const fileName = photoUri.split('/').at(-1)
  const reference = storage().ref('/avatars/' + me?.id + '__' + fileName)

  const createPost = async (post: any) => {
    reference
      .putFile(photoUri)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return {
    createPost,
  }
}
