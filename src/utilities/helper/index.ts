import { Platform } from 'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { Keyboard } from 'react-native';

// Languages
import { strings } from '../../utilities/i18n';

// Config
import config from '../../assets/data/config.json';

// Styles
import { dimensions } from '../../styles';

// Styles
import { colors } from '../../styles';

class Helper {

    isIOS() {
        return (Platform.OS === 'ios') ? true : false;
    }

    isAndroid() {
        return (Platform.OS === 'android') ? true : false;
    }

    isIphoneX() {
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
        Actions.refresh({ key: 'home', title: name });
    }

    /**
     * Function get UTC time
     */
    getTime() {
        const now = new Date();
        return moment.utc(now).valueOf();
    }

    /**
     * Function get custom key of messages
     * @param  {number} userId
     * @param  {number} guestId
     */
    getKeyMessages(userId: number, guestId: number) {
        if (Number.isInteger(userId) && Number.isInteger(guestId)) {
            if (userId < guestId) {
                return `${userId}_${guestId}`;
            }
            return `${guestId}_${userId}`;
        }
        return '';
    }

    /**
     * Function create a random string
     * @param  {number} len
     */
    randomString(len: number) {
        let str = '';
        let charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < len; i++) {
            str += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return str;
    }

    /**
     * Function to dismiss keyboard
     */
    dismissKeyboard() {
        Keyboard.dismiss();
    }

    /**
     * Function uppercase first letter
     * @param  {string} str
     */
    capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Function convert data to array before resolve
     * @param  {any} data
     */
    convertData(data: any) {
        const result = [];
        if (Object.keys(data).length > 0) {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const obj = data[key];
                    obj['$key'] = key;
                    result.push(obj);
                }
            }
        }
        return result;
    }

}

const helper = new Helper();
export default helper;