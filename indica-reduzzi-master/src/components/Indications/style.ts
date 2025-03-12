import { StyleSheet } from "react-native";
import { colors, fontFamily } from '@/styles/theme'

export const s = StyleSheet.create({
    button: {
        height: 150,
        minWidth: '85%',
        borderRadius: 10,
        
    },
    buttonSecondary: {
        width: '80%',
        padding: 15, 
      },
    buttonImageBackground: {
        height: '100%',
        justifyContent: 'space-between',
        alignContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 25,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 24,
        fontFamily: fontFamily.medium,
    },
    buttonTextSecondary: {
        color: '#FFF',
        fontSize: 12,
        backgroundColor: colors.blue.primary,
        borderRadius: 10,
        alignSelf: 'center',
        padding: 5,
    },
    buttonContent: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'space-between'
    }
})