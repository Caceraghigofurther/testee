import { StyleSheet } from 'react-native';
import { colors, fontFamily } from '@/styles/theme'

export const s = StyleSheet.create({
  indicationContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: 20,
  },
  inputBox: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    minWidth: '100%',
    minHeight: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 10,
    fontFamily: fontFamily.medium,
  },
  buttons: {
    gap: 10,
  },
  button: {
    minWidth: '100%',
    minHeight: 50,
    padding: 15,
    backgroundColor: colors.blue.primary,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  coords: {},
  coordView: {
    backgroundColor: '#FFF',
    minWidth: '100%',
    borderEndEndRadius: 10,
    borderStartEndRadius: 10,
  },
  coordButton: {
    borderEndEndRadius: 0,
    borderStartEndRadius: 0,
  },
  coordinatesText: {
    fontSize: 14,
    padding: 10,
    fontFamily: fontFamily.medium,   
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  submitButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#28A745',
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});