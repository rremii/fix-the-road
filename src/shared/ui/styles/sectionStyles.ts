import { StyleSheet } from 'react-native'

export const sectionStyles = StyleSheet.create({
  section: {
    gap: 5,
  },
  sectionRow: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  label: {
    lineHeight: 35,
    fontSize: 18,
    color: 'black',
  },
  withPadding: {
    paddingLeft: 20,
  },
})
