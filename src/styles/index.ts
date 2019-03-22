import { StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '../utilities/fonts';

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}

export const colors = {
    primary: '#3f7aa7',
    seconds: '#4a5568',
    red: '#cf1022',
    green: '#0b8011',
    facebook: '#4267A6',
    google: '#db4437',
    linkedin: '#283e4a',
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
    textWhite: '#aeb2ba',
    textBlack: '#000',
    bgWhite: '#dad8d9',
}

export const mainStyles = {
    btnLogin: {
        borderRadius: 5,
        fontSize: 14,
    },
    btnViewLogin: {
        marginTop: 15,
    },
    btnStyleLogin: {
        height: 45,
        padding: 0,
    },
    drawer: {
        width: 300,
        position: 'left' as 'left'
    },
    navigationBar: {
        backgroundColor: colors.seconds,
    },
    titleHeader: {
        color: colors.textWhite,
    },
}

export const mainFont = Fonts.RobotoCondensedRegular;