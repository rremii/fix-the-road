import { Bounds } from '@modules/map/types'
import { IPost } from '../types'

export const filterPostsByBounds = (posts: IPost[], bounds: Bounds) => {
  return posts.filter((post) => {
    const lat = post.lat
    const lng = post.lng

    const latMin = bounds.southWest.lat
    const lngMin = bounds.southWest.lng

    const latMax = bounds.northEast.lat
    const lngMax = bounds.northEast.lng

    return lat >= latMin && lat <= latMax && lng >= lngMin && lng <= lngMax
  })
}
