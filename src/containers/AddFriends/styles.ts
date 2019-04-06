import { StyleSheet } from 'react-native';
import { colors, mainFont, dimensions } from '../../styles';

export const styleSheet = StyleSheet.create({
    searchContent: {

    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    itemLeft: {
        width: (dimensions.fullWidth / 5) * 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    itemCenter: {
        width: (dimensions.fullWidth / 5) * 3,
        height: 60,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    itemAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    nameContact: {
        fontFamily: mainFont,
        fontSize: 18,
    },
    itemRight: {
        width: (dimensions.fullWidth / 5) * 1,
        height: 60,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputText: {
        fontSize: 15,
        color: '#eee',
    },
    itemIcon: {
        color: '#9f9f9f',
    },
});

export const styles = {
    clearIcon: {
        color: '#86939e',
        name: 'clear',
    },
}