import Camera from '@icons/camera.svg'
import CameraGray from '@icons/camera-gray.svg'
import Map from '@icons/map.svg'
import MapGray from '@icons/map-gray.svg'
import Profile from '@icons/profile.svg'
import ProfileGray from '@icons/profile-gray.svg'
import React from 'react'
import { iconSize } from './sizes'
import { BottomTabBarRouteData } from '../types'

export const bottomBarBarRoutes: BottomTabBarRouteData[] = [
  {
    title: 'Map',
    name: 'map',
    icon: <Map width={iconSize} height={iconSize} />,
    iconGray: <MapGray width={iconSize} height={iconSize} />,
    color: '#45a25f',
  },
  {
    title: 'New Post',
    name: 'newPost',
    icon: <Camera width={iconSize} height={iconSize} />,
    iconGray: <CameraGray width={iconSize} height={iconSize} />,
    color: '#4994c3',
  },
  {
    name: 'profile',
    title: 'Profile',
    icon: <Profile width={iconSize} height={iconSize} />,
    iconGray: <ProfileGray width={iconSize} height={iconSize} />,
    color: '#FE834D',
  },
]
