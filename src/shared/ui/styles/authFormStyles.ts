import { StyleSheet } from 'react-native'

export const authFormStyles = StyleSheet.create({
  form: {
    width: '80%',
    maxWidth: 320,
  },
  gapContainer: {
    gap: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 20,
    color: '#000',
  },

  btnContainer: {
    height: 35,
    alignItems: 'flex-end',
  },

  submitBtn: {
    height: 40,
  },

  additionalInfo: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    textAlign: 'right',
    color: '#000',
  },
})
