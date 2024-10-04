export type Coords = {
  lat: number
  lng: number
}
export type Bounds = {
  northEast: Coords
  southWest: Coords
}

export type MapType = 'web' | 'native'

type Icon = {
  iconUrl: string
  iconAnchor: [number, number]
  iconSize: [number, number]
}

export interface Marker extends Coords {
  id: number
  draggable: boolean
  icon?: Icon
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
type BoundsChange = Event<'boundsChange', Bounds>

export type MapReceiveEvents =
  | ClickMap
  | ClickMarker
  | DragMarker
  | BoundsChange

export interface MapAdapter {
  sendMessage: (message: MapSendEvents) => void
}
export interface MapAdapterProps {
  onMessage: (message: MapReceiveEvents) => void
}

export interface MapProps {
  markers?: Marker[]
  initCoords: Coords
  hideCenterBtn?: boolean

  onClick?: (coords: Coords) => void
  onClickMarker?: (marker: Marker) => void
  onDragMarker?: (marker: Marker) => void
  onBoundsChange?: (bounds: Bounds) => void
}
export interface IMap {
  center: (coords?: Coords) => void
}
