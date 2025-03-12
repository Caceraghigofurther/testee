import { StyleSheet } from 'react-native';
import { colors, fontFamily } from '@/styles/theme'

export const s = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',

    },
    box: {
        minWidth: '30%',
        maxWidth: '33%',
        minHeight: 75,
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
    },
    aprovadas: {
        backgroundColor: colors.stateColor.succes,
        borderColor: '#388E3C',
        
    },
    analise: {
        backgroundColor: colors.stateColor.warning,
        borderColor: '#FFA000',
    },
    negadas: {
        backgroundColor: colors.stateColor.error,
        borderColor: '#D32F2F',
    },
    numero: {
        fontSize: 24,
        fontFamily: fontFamily.bold,
        color: '#FFF',
    },
    label: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontFamily: fontFamily.medium,
    },
});