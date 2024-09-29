export type Coords = {
  lat: number
  lng: number
}

export type MapType = 'web' | 'native'

export interface Marker extends Coords {
  id: number
  draggable: boolean
  icon: string
}

type Event<T, P> = {
  type: T
  payload: P
}

//////
type DrawMarkers = Event<'drawMarkers', Marker[]>
type CenterMap = Event<'centerMap', Coords | undefined>

export type MapSendEvents = DrawMarkers | CenterMap

//////
type ClickMap = Event<'clickMap', Coords>
type ClickMarker = Event<'clickMarker', Marker>
type DragMarker = Event<'dragMarker', Marker>

export type MapReceiveEvents = ClickMap | ClickMarker | DragMarker

export interface MapAdapter {
  sendMessage: (message: MapSendEvents) => void
}
export interface MapAdapterProps {
  onMessage: (message: MapReceiveEvents) => void
}

export interface MapProps {
  markers?: Marker[]
  initCoords: Coords

  onClick?: (coords: Coords) => void
  onClickMarker?: (marker: Marker) => void
  onDragMarker?: (marker: Marker) => void
}
export interface IMap {
  center: (coords?: Coords) => void
}
