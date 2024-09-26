import { useWindowDimensions } from 'react-native'

const mediaBreakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
}

export const useMediaQuery = () => {
  const { width } = useWindowDimensions()

  const { desktop, tablet, mobile } = mediaBreakpoints

  const isMobile = width < mobile
  const isTablet = width >= tablet && width < desktop
  const isDesktop = width >= desktop

  return {
    isMobile,
    isTablet,
    isDesktop,
  }
}
