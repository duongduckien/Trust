import ReactNative from 'react-native';
import I18n from 'react-native-i18n';

// Language files
import en from '../../assets/locales/en.json';
import vi from '../../assets/locales/vi.json';

I18n.fallbacks = true;
I18n.translations = {
    en,
    vi
};
I18n.locale = 'en';

const currentLocale = I18n.currentLocale();
export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;
ReactNative.I18nManager.allowRTL(isRTL);

export function strings(name: any, params = {}) {
    return I18n.t(name, params);
};

export default I18n;