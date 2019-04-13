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
    |--------------------------------------------------
    | AUTHENTICATION
    |--------------------------------------------------
    */
    /**
     * @param  {string} email
     * @param  {string} password
     * @returns Promise
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
     * @returns Promise
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
     * @returns Promise
     */
    signOut(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase.auth().signOut();
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    getCurrentUser() {
        return firebase.auth().currentUser;
    }

    /**
    |--------------------------------------------------
    | CREATE DATA
    |--------------------------------------------------
    */
    /**
     * @param  {string} collection
     * @param  {any} data
     * @returns Promise
     */
    insert(collection: string, data: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase.database().ref(collection).push(data);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} key
     * @param  {any} data
     * @returns Promise
     */
    insertWithCustomKey(collection: string, key: string, data: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase.database().ref(collection).child(key).set(data);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param  {any} userData
     * @returns Promise
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
     * @returns Promise
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
    |--------------------------------------------------
    | READ DATA
    |--------------------------------------------------
    */
    /**
     * @param  {string} collection
     * @returns Promise
     */
    get(collection: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await firebase.database().ref(collection).once('value');
                if (res.val()) {
                    resolve(helper.convertData(res.val()));
                } else {
                    resolve([]);
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} param
     * @param  {any} value
     * @returns Promise
     */
    getWhere(collection: string, param: string, value: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await firebase.database().ref(collection).orderByChild(param).equalTo(value).once('value');
                if (res.val()) {
                    resolve(helper.convertData(res.val()));
                } else {
                    resolve([]);
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} key
     * @returns Promise
     */
    getWhereKey(collection: string, key: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await firebase.database().ref(collection).child(key).once('value');
                if (result.val()) {
                    resolve(result.val());
                } else {
                    resolve([]);
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} customKey
     * @returns Promise
     */
    getWhereCustomKey(collection: string, customKey: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await firebase.database().ref(collection).child(customKey).once('value');
                if (res.val()) {
                    resolve(helper.convertData(res.val()));
                } else {
                    resolve([]);
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} customKey
     * @returns Promise
     */
    getSubKeyWhereCustomKey(collection: string, customKey: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await firebase.database().ref(collection).child(customKey).once('value');
                if (res.val()) {
                    resolve(helper.getSubKeys(res.val()));
                } else {
                    resolve([]);
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param  {number} userId
     * @param  {number} guestId
     * @param  {any} guestInfo
     * @returns Promise
     */
    getMessages(userId: number, guestId: number, guestInfo: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                if (helper.getKeyMessages(userId, guestId)) {
                    const keyOfMsg = helper.getKeyMessages(userId, guestId);
                    const res = await firebase.database().ref('messages').child(keyOfMsg).once('value');
                    if (res.val()) {
                        resolve(this.convertMessages(res.val(), guestInfo));
                    } else {
                        resolve([]);
                    }
                } else {
                    throw new Error('Cannot create key of message.');
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} childName
     * @param  {string} text
     * @returns Promise
     */
    searchString(collection: string, childName: string, text: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await firebase.database().ref(collection).orderByChild(childName).startAt(text).endAt(`${text}\uf8ff`).once('value');
                if (res.val()) {
                    resolve(helper.convertData(res.val()));
                } else {
                    resolve([]);
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
    |--------------------------------------------------
    | UPDATE DATA
    |--------------------------------------------------
    */
    /**
     * @param  {string} collection
     * @param  {string} key
     * @param  {any} data
     * @returns Promise
     */
    updateWhereKey(collection: string, key: string, data: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase.database().ref(collection).child(key).update(data);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} key
     * @param  {any} data
     * @returns Promise
     */
    setDataWhereChild(collection: string, key: string, data: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase.database().ref(collection).child(key).set(data);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} key
     * @param  {any} data
     * @returns Promise
     */
    updateDataWhereChild(collection: string, key: string, data: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase.database().ref(collection).child(key).update(data);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} child
     * @param  {string} subChild
     * @param  {any} data
     * @returns Promise
     */
    setDataWhereMultiChilds(collection: string, child: string, subChild: string, data: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase.database().ref(collection).child(child).child(subChild).set(data);
                resolve();
            } catch(e) {
                reject(e);
            }
        });
    }
    
    /**
     * @param  {string} collection
     * @param  {string} child
     * @param  {string} subChild
     * @param  {any} data
     * @returns Promise
     */
    updateDataWhereMultiChilds(collection: string, child: string, subChild: string, data: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase.database().ref(collection).child(child).child(subChild).update(data);
                resolve();
            } catch(e) {
                reject(e);
            }
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} key
     * @param  {any} value
     * @returns Promise
     */
    setWhereKey(collection: string, key: string, value: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase.database().ref(collection).child(key).set(value);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
    |--------------------------------------------------
    | UTILITIES
    |--------------------------------------------------
    */
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
     * @param  {string} collection
     * @returns Promise
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

}

const firebaseSDKService = new FirebaseSDKService();
export default firebaseSDKService;