import { StyleSheet } from 'react-native';
import { colors, mainFont } from '../../styles';

export const styleSheet = StyleSheet.create({
    sideMenu: {
        backgroundColor: '#242d3c',
    },
    listMenu: {
        marginTop: 20,
    },
    textList: {
        paddingLeft: 10,
        color: '#fff',
        fontFamily: mainFont,
    },
    iconList: {
        color: '#ec3233',
        paddingLeft: 15,
    },
    listItem: {
        borderBottomColor: '#21252e',
        borderBottomWidth: 1,
        marginLeft: 0,
    },
    avatarView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
    },
});

export const styles = {

}