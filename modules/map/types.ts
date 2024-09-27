export interface PostMarker {
  lat: number
  lng: number
}

export interface MapMessageReceive<P> {
  type: MapReceiveEvents
  payload: P
}
export interface MapMessageSend<P> {
  type: MapSendEvents
  payload: P
}

export type MapType = 'web' | 'native'

export type MapSendEvents = 'drawMarkers' 

export type MapReceiveEvents = 'click'