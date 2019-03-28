import { StyleSheet } from 'react-native';
import { colors, mainFont, dimensions } from '../../styles';

export const styleSheet = StyleSheet.create({
    rowChat: {
        
    },
    guestChat: {
        // backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
    },
    meChat: {
        flex: 1,
        backgroundColor: 'blue',
        marginTop: 10,
    },
    contentGuestChatText: {
        flexDirection: 'row',
        // width: dimensions.fullWidth / 2,
        maxWidth: dimensions.fullWidth / 2,
        backgroundColor: '#f2f1f1',
        borderRadius: 5,
    },
    contentMeChatText: {
        flexDirection: 'row',
        width: dimensions.fullWidth / 2,
        backgroundColor: '#f2f1f1',
        borderRadius: 5,
    },
    chatText: {
        flex: 1,
        flexWrap: 'wrap',
        padding: 5,
        fontFamily: mainFont,
        textAlign: 'justify',
    },
    contentAvatar: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
    },
});

export const styles = {
    avatarGuest: {
        width: dimensions.fullWidth / 12,
    }
}