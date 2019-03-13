import { Platform } from 'react-native';

// Config
import config from '../../assets/data/config.json';

// Styles
import { dimensions } from '../../styles';

export class Helper {

    isIOS() {
        return (Platform.OS === 'ios') ? true : false;
    }

    isAndroid() {
        return (Platform.OS === 'android') ? true : false;
    }

    isIphoneX () {
        const height = config['devices']['iphoneX']['height'];
        const width = config['devices']['iphoneX']['width'];
        return (
            Platform.OS === 'ios' &&
            ((dimensions.fullHeight === height && dimensions.fullWidth === width) ||
            (dimensions.fullHeight === width && dimensions.fullWidth === height))
        );
    }

    isIphoneXR() {
        const height = config['devices']['iphoneXR']['height'];
        const width = config['devices']['iphoneXR']['width'];
        return (
            Platform.OS === 'ios' &&
            ((dimensions.fullHeight === height && dimensions.fullWidth === width) ||
            (dimensions.fullHeight === width && dimensions.fullWidth === height))
        );
    }

}