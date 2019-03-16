import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export const styleSheet = StyleSheet.create({
    loginView: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        marginTop: '20%',
    },
    signInContent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        flex: 1,
        flexDirection: 'row',
    },
    registerTxt: {
        color: colors.primary,
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 14
    },
    dontHaveAccount: {
        fontSize: 13
    },
    orContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    orContentMid: {
        width: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orContentText: {
        color: '#6d6d6d',
    },
    orContentStraight: {
        width: 50,
        height: 20,
        borderBottomColor: '#6d6d6d',
        borderBottomWidth: 1,
    }
});

export const styles = {

}