import { StyleSheet } from 'react-native';
import { colors, mainFont, dimensions } from '../../styles';

export const styleSheet = StyleSheet.create({
    nameContact: {
        fontFamily: mainFont,
        fontSize: 18,
    },
    statusText: {
        fontFamily: mainFont,
        fontSize: 12,
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    listItemOpc: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        opacity: 0.7,
    },
    itemLeft: {
        width: (dimensions.fullWidth / 5) * 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        // backgroundColor: 'red',
    },
    itemCenter: {
        width: (dimensions.fullWidth / 5) * 3,
        height: 60,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'blue',
    },
    itemRight: {
        width: (dimensions.fullWidth / 5) * 1,
        height: 60,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    itemAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    itemIcon: {
        color: '#9f9f9f',
    },
    noDataView: {
        paddingTop: 20,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataViewText: {
        fontFamily: mainFont,
        fontSize: 18,
    },
});

export const styles = {

}