import { StyleSheet } from 'react-native'

export const sectionStyles = StyleSheet.create({
  section: {
    gap: 5,
  },
  sectionRow: {
    gap: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
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
    fontSize: 20,
    color: 'black',
  },
  withPadding: {
    paddingLeft: 20,
  },
})
