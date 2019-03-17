import { StyleSheet } from 'react-native';
import { colors, mainFont } from '../../styles';

export const styleSheet = StyleSheet.create({
    btnStyleAccess: {
        height: 45,
        padding: 0,
        marginTop: 20,
    },
    inputField: {
        fontSize: 15,
        fontFamily: mainFont,
    },
    btnEmail: {
        fontFamily: mainFont,
        textTransform: 'uppercase',
    },
});

export const styles = {
    btnEmail: {
        color: '#fff',
        backgroundColor: colors.red,
        fontWeight: 'bold'
    }
}