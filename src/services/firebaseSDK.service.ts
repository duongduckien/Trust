import firebase from 'react-native-firebase';
import _ from 'lodash';

// Utilities
import helper from '../utilities/helper';

// Config
import config from '../assets/data/config.json';

// Interfaces
import { IUserGiftedChat, IMessageGiftedChat } from '../interfaces/chat.interface';

class FirebaseSDKService {

    constructor() {

    }

    /**
     * Function authentication
     * @param  {string} email
     * @param  {string} password
     */
    auth(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password).then((res: any) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    /**
     * Function check logged
     */
    logged(): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user: any) => {
                if (user) {
                    resolve(user);
                } else {
                    reject('error');
                }
            });
        });
    }

    /**
     * Function sign out
     */
    signOut(): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.auth().signOut().then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    /**
     * Function get current user
     */
    getCurrentUser() {
        return firebase.auth().currentUser;
    }

    /**
     * @param  {string} collection
     * @param  {any} data
     */
    insert(collection: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(collection).push(data, (err: any) => {
                if (!err) {
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} key
     * @param  {any} data
     */
    updateWhereKey(collection: string, key: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(collection).child(key).update(data, (err: any) => {
                if (!err) {
                    resolve();
                } else {
                    reject(err);
                }
            })
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} key
     * @param  {any} data
     */
    insertWithCustomKey(collection: string, key: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(collection).child(key).set(data, (err: any) => {
                if (!err) {
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }
    
    /**
     * @param  {string} collection
     * @param  {string} key
     * @param  {any} data
     * @returns Promise
     */
    setDataWhereChild(collection: string, key: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(collection).child(key).set(data, (err: any) => {
                if (!err) {
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} key1
     * @param  {string} key2
     * @param  {any} data
     * @returns Promise
     */
    setDataWhereMultiChilds(collection: string, child: string, subChild: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(collection).child(child).child(subChild).set(data, (err: any) => {
                if (!err) {
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * @param  {string} collection
     */
    getUniqueId(collection: string): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref('lastId').child(collection).once('value', async (res: any) => {
                if (res.val()) {

                    const lastId = res.val();

                    if (Number.isInteger(lastId) && lastId > 0) {

                        const nextId = lastId + 1;

                        try {
                            await this.setWhereKey('lastId', collection, nextId);
                            resolve(nextId);
                        } catch (e) {
                            reject(e);
                        }

                    } else {
                        reject();
                    }

                } else {
                    reject();
                }
            });
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} key
     * @param  {any} value
     */
    setWhereKey(collection: string, key: string, value: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(collection).child(key).set(value).then((res: any) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} param
     * @param  {any} value
     */
    getWhere(collection: string, param: string, value: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(collection).orderByChild(param).equalTo(value).once('value', (res: any) => {
                if (res.val()) {
                    resolve(this.convertData(res.val()));
                } else {
                    reject();
                }
            });
        });
    }

    /**
     * @param  {string} collection
     */
    get(collection: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await firebase.database().ref(collection).once('value');
                if (res.val()) {
                    resolve(this.convertData(res.val()));
                } else {
                    reject('Can not retrieve data.');
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} key
     */
     getWhereKey(collection: string, key: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await firebase.database().ref(collection).child(key).once('value');
                if (result.val()) {
                    resolve(result.val());
                } else {
                    reject('Can not retrieve data.');
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} customKey
     */
    getWhereCustomKey(collection: string, customKey: string): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(collection).orderByChild(customKey).once('value', (res: any) => {
                if (res.val()) {
                    resolve(res.val());
                } else {
                    reject();
                }
            });
        });
    }

    /**
     * @param  {any} userData
     */
    createUser(userData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {

            try {

                if (!userData['email'] || userData['email'] === '') {
                    throw new Error('Missing email value.');
                }

                if (!userData['password'] || userData['password'] === '') {
                    throw new Error('Missing password value.');
                }

                await firebase.auth().createUserWithEmailAndPassword(userData['email'], userData['password']);

                // Get unique ID
                const id = await this.getUniqueId('users');

                // Add new keys
                userData['userId'] = id;
                userData['createdAt'] = helper.getTime();
                userData['updatedAt'] = helper.getTime();
                userData['deleted'] = 0;

                // Insert user data to firebase
                await this.insert('users', userData);

                resolve('Create user succesfully.');

            } catch (e) {
                reject(e);
            }

        });
    }

    /**
     * @param  {number} userId
     * @param  {number} guestId
     * @param  {any} msgData
     */
    createMessage(userId: number, guestId: number, msgData: any): Promise<any> {
        return new Promise((resolve, reject) => {

            if (helper.getKeyMessages(userId, guestId)) {

                const keyOfMsg = helper.getKeyMessages(userId, guestId);
                firebase.database().ref('messages').child(keyOfMsg).push(msgData, (err: any) => {
                    if (!err) {
                        resolve();
                    } else {
                        reject(err);
                    }
                });

            } else {
                reject('Cannot create key of message.');
            }

        });
    }

    /**
     * @param  {number} userId
     * @param  {number} guestId
     */
    getMessages(userId: number, guestId: number, guestInfo: any): Promise<any> {
        return new Promise((resolve, reject) => {

            if (helper.getKeyMessages(userId, guestId)) {

                const keyOfMsg = helper.getKeyMessages(userId, guestId);
                firebase.database().ref('messages').child(keyOfMsg).once('value', res => {
                    if (res.val()) {
                        resolve(this.convertMessages(res.val(), guestInfo));
                    } else {
                        reject();
                    }
                });

            } else {
                reject('Cannot create key of message.');
            }

        });
    }

    /**
     * Function search substring in value
     * @param  {string} collection
     * @param  {string} childName
     * @param  {string} text
     */
    searchString(collection: string, childName: string, text: string): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(collection).orderByChild(childName).startAt(text).endAt(`${text}\uf8ff`).once('value', (res: any) => {
                if (res.val()) {
                    resolve(this.convertData(res.val()));
                } else {
                    reject();
                }
            });
        });
    }

    /**
     * Function convert messages data
     * @param  {any} data
     * @param  {any} guestInfo
     */
    convertMessages(data: any, guestInfo: any) {
        const result = [];
        if (Object.keys(data).length > 0) {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {

                    const userSender: IUserGiftedChat = {
                        _id: data[key]['userId'],
                        name: `${guestInfo['firstName']} ${guestInfo['lastName']}`,
                        avatar: guestInfo['avatar'],
                    }

                    const obj: IMessageGiftedChat = {
                        _id: key,
                        text: data[key]['message'],
                        createdAt: new Date(data[key]['createdAt']),
                        user: userSender,
                    }

                    result.push(obj);

                }
            }
        }
        return _.orderBy(result, 'createdAt', 'desc');
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

    /**
     * Function convert data to array before resolve (without key)
     * @param  {any} data
     * @param  {string} key
     */
     convertDataOfKey(data: any, key: string) {
        const result = [];
        data['$key'] = key;
        result.push(data);
        return result;
    }

}

const firebaseSDKService = new FirebaseSDKService();
export default firebaseSDKService;