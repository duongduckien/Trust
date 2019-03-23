import { Platform } from 'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { Actions } from 'react-native-router-flux';

// Languages
import { strings } from '../../utilities/i18n';

// Config
import config from '../../assets/data/config.json';

// Styles
import { dimensions } from '../../styles';

// Styles
import { colors } from '../../styles';

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

    /**
     * Function show alert
     * @param  {string} type
     * @param  {string} msg
     */
    showAlert(type: string, msg: string) {

        switch (type) {
            case 'success': {

                showMessage({
                    message: strings('SUCCESS'),
                    description: msg,
                    backgroundColor: colors.success,
                    color: colors.textWhite,
                    icon: 'success'
                });

                break;

            }
            case 'warning': {
                
                showMessage({
                    message: strings('WARNING'),
                    description: msg,
                    backgroundColor: colors.warning,
                    color: colors.textBlack,
                    icon: 'warning'
                });
                
                break;

            }
            case 'error': {
                
                showMessage({
                    message: strings('ERROR'),
                    description: msg,
                    backgroundColor: colors.error,
                    color: colors.textWhite,
                    icon: 'danger'
                });
                
                break;

            }
            default: {
                break;
            }
        }

    }

    /**
     * Function trim space of string
     * @param  {string} str
     */
    trimStr(str: string) {
        return str.trim();
    }

    /**
     * Function set title of header
     * @param  {string} name
     */
    setTitle(name: string) {
        Actions.refresh({key: 'home', title: name});
    }

}