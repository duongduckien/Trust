import { StyleSheet, Dimensions } from 'react-native';

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}

export const colors = {
    primary: '#0f82a9',
    facebook: '#4267A6',
    google: '#db4437',
    linkedin: '#283e4a',
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
    textWhite: '#fff',
    textBlack: '#000'
}

export const mainStyles = {
    btnLogin: {
        borderRadius: 10,
        fontSize: 14,
    },
    btnViewLogin: {
        marginTop: 15,
    },
    btnStyleLogin: {
        height: 45,
        padding: 0,
    },
}