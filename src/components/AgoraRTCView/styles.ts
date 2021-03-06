import { StyleSheet } from 'react-native';
import { dimensions } from '../../styles';

// Utilities
import helper from '../../utilities/helper';

const safeTop = (top: any) => (helper.isIphoneX() ? (top + 88) : (helper.isIphoneXR() ? (top + 64) : top));

export const styleSheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
    },
    absView: {
        position: 'absolute',
        top: safeTop(0),
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
    },
    videoView: {
        padding: 5,
        flexWrap: 'wrap',
        flexDirection: 'row',
        zIndex: 100
    },
    localView: {
        flex: 1
    },
    remoteView: {
        width: (dimensions.fullWidth - 40) / 3,
        height: (dimensions.fullWidth - 40) / 3,
        margin: 5
    },
    bottomView: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    creatingConf: {
        flex: 1, 
        backgroundColor: '#fff', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    cancel: { 
        alignSelf: 'center', 
        marginBottom: -10,
    },
    cancelImg: { 
        width: 60, 
        height: 60,
    },
    flashImg: { 
        width: 40, 
        height: 40,
    }
});

export const styles = {

}
