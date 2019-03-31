import AsyncStorage from '@react-native-community/async-storage';

class Storage {

    setItem(key: string, value: any): Promise<any> {
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem(key, value).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    getItem(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(key).then((value: any) => {
                resolve(value);
            }).catch(() => {
                reject();
            });
        });
    }

    removeItem(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            AsyncStorage.removeItem(key).then((value: any) => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

}

const storage = new Storage();
export default storage;